const FILE = require("../MODELS/file");
import { RequestHandler } from "express";

const postPics: RequestHandler = async (req, res, next) => {

   const recievedfiles: Express.Multer.File[] = req.files as Express.Multer.File[];
   const { title, price, description } = req.body;

   const files = recievedfiles.map((file: any) => file.path);



   let newImage = new FILE({
      title: title,
      price: parseFloat(price),
      description: description,
      file: files
   });

   try {
      newImage.save();
   }

   catch (err) {
      if (err instanceof Error) {
         const error = new Error("SOMETHING WENT WRONG , CANT SAVE FILES");

         err.code = 500;
         console.log("ERROR IN UPLOAD : " + err);
         return next(error);
      }

   }

   console.log(newImage.file);

   res.status(201).json({ message: "FILES UPLOADED SUCCESS" });

};

const getPics: RequestHandler = async (req, res, next) => {

   const skip = parseInt(((req.query) as { skip: string }).skip) || 0;
   const limitPerView = 3;

   let files;
   try {
      files = await FILE.find({}).limit(limitPerView).skip(skip);
   }

   catch (err) {
      const error = new Error("SOMETHING WENT WRONG ");
      error.code = 500;
      return next(error);
   }

   res.status(200).json({ files: files });
};

exports.getPics = getPics;

exports.postPics = postPics;

