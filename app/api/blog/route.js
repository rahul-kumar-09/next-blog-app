import { connectDb } from "@/lib/config/db";
import { Connection } from "mongoose";
import {writeFile} from "fs/promises"
import { log } from "console";
import blogModel from "@/lib/models/BlogModel";
import BlogItem from "@/Components/BlogItem";
const fs = require('fs');

const { NextResponse } = require("next/server");

// Connect to database only if not already connected
let isConnected = false;
const loadDB = async () => {
    if (!isConnected) {
        try {
            await connectDb();
            isConnected = true;
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection error:', error);
        }
    }
}

// api endpoint to get blog
export async function GET(request) {
    await loadDB();

    const blogId = request.nextUrl.searchParams.get("id")

    if (blogId) {
        const blog = await blogModel.findById(blogId);
        return NextResponse.json(blog)
    }else{
        try {
            const allBlogs = await blogModel.find({});
            return NextResponse.json({ success: true, data: allBlogs });
        } catch (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
    }

  
}


// api endpoint uploading blog
export async function POST(request) {
    try {
        await loadDB();
        const formData = await request.formData();
        const timestamp = Date.now();

        const image = formData.get('image');
        if (!image) {
            return NextResponse.json({ success: false, msg: "Image is required" }, { status: 400 });
        }

        // Convert image to base64 string
        const imageByteData = await image.arrayBuffer();
        const base64Image = Buffer.from(imageByteData).toString('base64');
        const imgUrl = `data:${image.type};base64,${base64Image}`;

        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            image: imgUrl,
            authorImg: formData.get('authorImg'),
        }

        await blogModel.create(blogData); 
        console.log("Blog saved");
        
        return NextResponse.json({success: true, msg: "Blog added"})
    } catch (error) {
        console.error("Error saving blog:", error);
        return NextResponse.json(
            { success: false, msg: "Failed to save blog", error: error.message },
            { status: 500 }
        );
    }
}


//create api to endpoint delete
export async function DELETE(request) {
    try {
        await loadDB();
        const id = request.nextUrl.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ 
                success: false, 
                msg: "Blog ID is required" 
            }, { status: 400 });
        }

        const blog = await blogModel.findById(id);
        if (!blog) {
            return NextResponse.json({ 
                success: false, 
                msg: "Blog not found" 
            }, { status: 404 });
        }

        // Delete the image file if it exists
        if (blog.image) {
            try {
                fs.unlinkSync(`./public${blog.image}`);
            } catch (error) {
                console.error('Error deleting image file:', error);
                // Continue with blog deletion even if image deletion fails
            }
        }

        await blogModel.findByIdAndDelete(id);
        return NextResponse.json({
            success: true,
            msg: "Blog deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ 
            success: false, 
            msg: "Failed to delete blog",
            error: error.message 
        }, { status: 500 });
    }
}