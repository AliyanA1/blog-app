const mongoose=require("mongoose");
require('dotenv').config(); 
 
module.exports=mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB is connected");
})
.catch((error) => {
    console.log("Error in this code:", error);
});




