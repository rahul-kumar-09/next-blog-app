import { connectDb } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await connectDb();
}

LoadDB();

export async function GET() {
    try {
        const emails = await EmailModel.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, data: emails });
    } catch (error) {
        return NextResponse.json(
            { success: false, msg: "Failed to fetch subscriptions", error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({success: true, msg: "Email Subscribed"})
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ 
                success: false, 
                msg: "Email ID is required" 
            }, { status: 400 });
        }

        const email = await EmailModel.findById(id);
        if (!email) {
            return NextResponse.json({ 
                success: false, 
                msg: "Email subscription not found" 
            }, { status: 404 });
        }

        await EmailModel.findByIdAndDelete(id);
        return NextResponse.json({
            success: true,
            msg: "Email subscription deleted successfully"
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            msg: "Failed to delete email subscription",
            error: error.message 
        }, { status: 500 });
    }
}