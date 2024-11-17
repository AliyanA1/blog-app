const express=require("express");
const multer=require("multer");
const path=require("path")
const route=express.Router();
const blog=require("../models/blog")
const {checkPoint}=require("../middlewares/middleware");
const comment=require("../models/comments");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, '..', 'public', 'upload');
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  }); 


const upload = multer({ storage: storage })

route.get("/all",async(req,res)=>{
  let blogs=await blog.find();
  res.send(blogs)
})


route.get("/add-new", (req, res) => {
  return res.render("addBlog", { user: req.user });
});


route.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the ID to avoid CastErrors
 
  try {
      const blogs = await blog.findById(id).populate("createdBy");
      
      if (!blogs) return res.status(404).send("Blog was not found Error!");
      const c=await comment.find({blodId: req.params.id }).populate("createdBy")


      return res.render("blog", {
          user: req.user, 
          blogs,
          c,
      });
  } catch (error) {
      console.error("Error fetching blog:", error);
      return res.status(500).send("Server Error");
  }
});

route.post("/comment/:blogId",checkPoint,async(req,res)=>{
  const com=await comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id
  });
  return res.redirect(`/blog/${req.params.blogId}`)
})





route.post("/", checkPoint, upload.single("ImageUrl"), async (req, res) => {
  const { title, body } = req.body;


  try {
      const userBlog = await blog.create({
          title,
          body,
          createdBy: req.user._id,
          ImageUrl: `/upload/${req.file.filename}`,
      });

      return res.redirect(`/blog/${userBlog._id}`);
  } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).send("Failed to create blog");
  }
});


module.exports=route 