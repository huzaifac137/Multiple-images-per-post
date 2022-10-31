const multer = require("multer");
const FILETYPE = {
    "image/jpg" : "jpg" ,
     "image/jpeg" :"jpeg" ,
     "image/png" :"png"
};

const fileUploader=  multer({
    
    limits : 5000000 ,
    storage : multer.diskStorage({ 

        destination: (req,file,cb)=>{
             cb(null , "uploads/images");
        } ,

        filename : (req,file,cb)=>{
             const extension = FILETYPE[file.mimetype];
             cb(null , file.originalname+"."+extension);
        }
     
    }) ,

    fileFilter:(req,file,cb)=>
    {
         const isValid = !!FILETYPE[file.mimetype];

         const error = isValid===true ? null : new Error("INVALID MIMETYPE");
         cb(error , isValid);
    }

});

module.exports = fileUploader;