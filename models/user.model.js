import mongoose from "mongoose";
import {createHmac, randomBytes} from "crypto"
import { createToken } from "../services/authentication.service.js";

const userSchema=new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String,
    },
    imgUrl:{
        type: String,
        default : "/images/defulatImg.png"
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

},{timestamps:true})

userSchema.pre("save", function(next){
      const user=this;

      if(!user.isModified("password")) return;
 
      //generating salt and hashing password
      const salt=randomBytes(16).toString();
      const hashPassword= createHmac('sha256',salt)
      .update(user.password)
      .digest('hex')

      user.salt=salt;
      user.password=hashPassword;

      next();
})

//comparing password
userSchema.methods.comparePassword=async function (password){
    
       const salt=this.salt;
        const hashPassword=this.password;

      const userHashPassword=createHmac('sha256',salt)
      .update(password)
      .digest('hex')
 
       if(hashPassword !== userHashPassword) throw new Error("user not found")

       const token=createToken(this)
     

      return token;
}


const userModel=mongoose.model("users", userSchema);

export default userModel;