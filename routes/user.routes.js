import express from "express";
import userModel from "../models/user.model.js";
import { createToken } from "../services/authentication.service.js";
// import users from "../models/user.model.js";

const userRouter=express.Router();

//sigUp routes get
userRouter.get("/signUp", (req,res)=>{
    res.render("signup")
})
//signuP route post
userRouter.post('/signUp', async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.render("signup",{error: "All fields are required"});
    }

    const checkEmail=await userModel.findOne({email});
  
    if(checkEmail){
      return res.render("signup" , {error: "Email already exist"})
    }

    const data = new userModel({ userName, email, password });
    await data.save();
    
    const token=createToken(data);
    res.cookie("token",token);

    res.redirect("/");
  } catch (err) {
    res.render("signup", {error: "this email already exit"})
  }
});


//signIn route get
userRouter.get("/signIn", (req,res)=>{
   res.render("signin")
})
//sigIn route post
userRouter.post("/signIn",async(req,res)=>{
  const {email, password}=req.body;
  try {
    const user=await userModel.findOne({email})
    if(!user) res.render("signIn",{error:"incorrect password or email"});
    const token=await user.comparePassword(password);
    
     res.cookie("token",token)
     return res.redirect("/")

  } catch (error) {
     res.render("signin",{error:"incorrect password or email"});
  }
})

userRouter.get("/logout",(req,res)=>{
  res.clearCookie("token");
  res.redirect("/")
})


export default userRouter;