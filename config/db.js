import mongoose from "mongoose";

export const connectingDb=async()=>{
    try {
       const re= await mongoose.connect("mongodb://127.0.0.1:27017/blog")
        console.log('database conected successfuly')
    } catch (error) {
        console.log(error.message)
    }
}