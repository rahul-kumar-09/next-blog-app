import mongoose from 'mongoose'
import second from 'mongoose'

export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://rahul7827759:blog321@cluster0.rwchgco.mongodb.net/blog-app');
    console.log("DB connected");
    
}