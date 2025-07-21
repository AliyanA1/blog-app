import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

const commentModel=mongoose.model("comment", commentSchema);

export default commentModel;