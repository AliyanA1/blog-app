const mongoose=require("mongoose");
require('dotenv').config(); 
 
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB is know connected");
})
.catch((error) => {
    console.log(" there is Error in this code:", error);
});

module.exports=mongoose.connection;



