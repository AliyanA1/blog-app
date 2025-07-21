import express from "express";
import blogModel from "../models/blog.model.js";
import multer from "multer";
import path from "path"
import fs from "fs"
import { middleware } from "../middleware/middleware.js";
import commentModel from "../models/comment.model.js";

const app=express();
app.use(middleware());
const blogRouter=express.Router();

//multer
const storage=multer.diskStorage({
    destination: function(req,res,cb){
        const userfolder=`public/uploads/${req.user.userName}`
       if(!fs.existsSync(userfolder)){
         fs.mkdirSync(userfolder, {recursive:true})
       }
        cb(null, userfolder)
    },
    filename: function(req,file,cb){
          const ext=path.extname(file.originalname);
        const fileName=`${Date.now()}`
      
        cb(null, fileName + ext)
    }
});
const upload=multer({storage});




blogRouter.get("/add-new",(req,res)=>{
    res.render("addBlog")
})

blogRouter.post("/add-new", upload.single("ImageUrl") , async(req,res)=>{
    
  try {
   
      if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

     const {title, body}= req.body;

    const imagePath= req.file ? `/uploads/${req.user.userName}/${req.file.filename}`:null;
   
    const blogData=new blogModel({
        title,
        body,
        ImageUrl:imagePath,
        userId: req.user.id,
    });
    await blogData.save();
  

    res.render("blog", {blogs: blogData})
    
   } catch (error) {
     console.log("error", error.message);
     res.json({
        message: "blog creation faild",
        error: error.message
     })
   }
})

blogRouter.get("/:id",async(req,res)=>{
  const id=req.params.id;
   const blogs=await blogModel.findById(id).populate("userId");
   const comments=await commentModel
   .find({blogId: id})
   .populate("userId")
   .sort({createdAt: -1})
  
   res.render("blog",{
    user: req.user,
     blogs,
     comments
   })

})

//edit route
blogRouter.get("/edit/:id",async(req,res)=>{
  const findblog=await blogModel.findById(req.params.id);
 
  res.render("addBlog", {isEdit: true, blog: findblog})
})

//edit post route
blogRouter.post("/update/:id", upload.single("ImageUrl") ,async(req,res)=>{
 
   const imagePath= req.file ? `/uploads/${req.user.userName}/${req.file.filename}`: undefined;
 

   const  updateData={
        title: req.body.title,
        body: req.body.body,
       
    };

    if(imagePath !== undefined){
        updateData.ImageUrl=imagePath;
    }

    await blogModel.findByIdAndUpdate(req.params.id,updateData)

    res.redirect(`/blog/${req.params.id}`);

})

//deleting blog
blogRouter.get("/delete/:id", async(req,res)=>{
  await blogModel.findByIdAndDelete(req.params.id);
  res.redirect("/")
})


blogRouter.post("/comment/:blogId",async(req,res)=>{
  const comment=new commentModel({
    content: req.body.content,
    blogId:  req.params.blogId,
    userId: req.user.id
  });
  await comment.save();
  res.redirect(`/blog/${req.params.blogId}`)
})

export default blogRouter;