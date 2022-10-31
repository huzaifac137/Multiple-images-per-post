const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads/images" , express.static(path.join("uploads" , "images")));

const fileRoutes = require("./ROUTES/fileRoutes");

app.use("/api/files" , fileRoutes);


app.use((req,res,next)=>{
        
    res.status(404);
    res.json({message: "ROUTE NOT FOUND"});

});

app.use((err, req, res , next)=>{

    if(req.files)
    {
        fs.unlink(req.files);
    }

    if(res.headerSent)
    {
        return next(err);
    }

    res.status(err.code ||500);
    res.json({message : err.message || "SOMETHING WENT WRONG"});
});

const connectDB =async()=>
{
    try
    {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGOOSE CONNECTED");
    }

    catch(err)
    {
        console.log("ERROR IS : " + err.message);
    }
  

} ;

connectDB();


app.listen(process.env.PORT);



