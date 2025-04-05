import { connectDb } from "@/lib/config/db";
import { Connection } from "mongoose";
import {writeFile} from "fs/promises"
import { log } from "console";
import blogModel from "@/lib/models/BlogModel";

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

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        const path = `./public/${timestamp}_${image.name}`
        await writeFile(path, buffer);
        const imgUrl = `/${timestamp}_${image.name}`

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