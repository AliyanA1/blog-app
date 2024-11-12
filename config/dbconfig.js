const mongoose=require("mongoose");
require('dotenv').config(); 
 
module.exports=mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log("Error in code:", err);
});




