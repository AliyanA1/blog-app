const {Schema,model}=require("mongoose");

const blogSchema=new Schema({
    title: String,
    body: String,
    ImageUrl: String,
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},{timestamps: true});

module.exports=model("blog",blogSchema);