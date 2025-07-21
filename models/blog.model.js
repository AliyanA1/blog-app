import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    body:{
        type: String,
        required: true,
        trim: true
    },
    ImageUrl:{
        type: String,

    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, {timestamps: true});

const blogModel=mongoose.model("blog", blogSchema);

export default blogModel;