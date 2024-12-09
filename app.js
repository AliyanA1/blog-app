require('dotenv').config(); 
/here the main code
const express=require("express");
const path=require("path")
const app=express();
const db=require("./config/dbconfig")
const userRoute=require("./routes/user");  
const blogRoute=require("./routes/blog")
const cookieParser=require("cookie-parser");  
const port=3000 || process.env.PORT;

//app.set
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//app.use middleware

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"public")));
app.use("/user",userRoute);   
app.use("/blog",blogRoute);

 

 
app.listen(port);
