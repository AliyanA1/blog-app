const mongoose=require("mongoose");
require('dotenv').config(); 
 
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB is connected");
})
.catch((error) => {
    console.log("Error in this code:", error);
});

module.exports=mongoose.connection;



