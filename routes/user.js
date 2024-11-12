const {Router}=require("express");
const userModle=require("../models/user");
const user = require("../models/user");
const route=Router();
const {createWebToken}=require("../services/auth")
const {checkPoint}=require("../middlewares/middleware")
const blog=require("../models/blog");

route.get("/home",checkPoint,async (req,res)=>{
    const allBlog=await blog.find({});
    res.render("home",{
        user: req.user,
        blogs: allBlog
    })
})

route.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/user/signin");
})

route.get("/all",async (req,res)=>{
    let user=await userModle.find();
    res.send(user)
})

route.get("/signin",(req,res)=>{
    res.render("signin");
})

route.post("/signin",async (req,res)=>{
    const {email, password}=req.body;
    
    try{
        const userObj=await user.matchPassword(email,password);
        const token=createWebToken(userObj);
     
       
        return res.cookie("token",token).redirect("/user/home")
    }
    catch(error){
        res.render("signin",{error:"incorrect password or email"});
    } 
})

route.get("/signup",(req,res)=>{
    res.render("signup");
})

route.post("/signup",async (req,res)=>{
    const {fullname,email,password}=req.body;
   let user= await userModle.create({
        fullname,
        email,
        password,
    });
    const token= createWebToken(user)
    return res.cookie("token",token).redirect("/user/home")
})
 
module.exports=route;