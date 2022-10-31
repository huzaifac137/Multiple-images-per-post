const FILE = require("../MODELS/file");

const postPics=async(req,res,next)=>
{
       
     const recievedfiles = req.files;
     const{title , price , description} = req.body;
     const files = recievedfiles.map((file)=>file.path);
     

   let newImage = new FILE({
      title : title ,
      price : parseFloat(price) ,
      description : description,
      file : files
   });

   try
   {
    newImage.save();
   }

   catch(err)
   {
    const error = new Error("SOMETHING WENT WRONG , CANT SAVE FILES");
    error.code =500;
    return next(error);
   }

   res.status(201).json({message : "FILES UPLOADED SUCCESS"});
      
}; 

const getPics=async(req,res,next)=>{
    
    const skip = parseInt(req.query.skip) || 0;
    const limitPerView =3;

    let files;
    try
    {
     files = await FILE.find({}).limit(limitPerView).skip(skip);
    }

    catch(err)
    {
     const error = new Error("SOMETHING WENT WRONG ");
     error.code =500;
     return next(error);
    }

    res.status(200).json({files : files});
};

exports.getPics = getPics;

exports.postPics = postPics;