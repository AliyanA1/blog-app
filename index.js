//imp imports
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

//local imports
import { connectingDb } from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import { middleware } from "./middleware/middleware.js";
import blogRouter from "./routes/blog.routes.js";
import blogModel from "./models/blog.model.js";

//configs
connectingDb();
dotenv.config();


const app=express();
const PORT=process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//imp middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(middleware());
app.use("/uploads", express.static("public/uploads"));
app.use("/images", express.static(path.join(__dirname, "public/images")));




app.set('view engine', 'ejs');
app.set("views",path.resolve('./views'));

//routes
app.get('/', async (req, res) => {
  try {
    const allBlogs = await blogModel.find();
   
    res.render("home", {
      user: req.user,
      blogs: allBlogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT , ()=>{
    console.log(`sever is listen on the port: http://localhost:${PORT}`)
})







