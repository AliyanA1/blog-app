const {createHmac,randomBytes}=require("crypto");
const {Schema,model, Error}=require("mongoose");


const userSchema= new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        // unique: true
    },
    salt:{
       type: String,
      
    },
    password:{
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String,
        default: "/images/profile.png"
    },
    role:{
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER",
    }
},{timestamps:true});

userSchema.pre("save", function(next){
    const user=this;
    if(!user.isModified("password")) return;

    const salt=randomBytes(16).toString();
    const hashpassword=createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashpassword;

    next();

});

userSchema.static("matchPassword",async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error("user not found")

    const salt=user.salt;
    const hashpassword=user.password;

    const userHashPassword=createHmac("sha256",salt)
    .update(password)
    .digest("hex");
   
    if(userHashPassword !== hashpassword)throw new Error("incorrest password")
    
    return user;
})

const user=model("user",userSchema);

module.exports=user;