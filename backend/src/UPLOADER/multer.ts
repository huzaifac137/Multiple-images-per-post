import { Multer, FileFilterCallback } from "multer";

const multer = require("multer");

interface IFF {
     [prop: string]: string
};

const FILETYPE: IFF = {
     "image/jpg": "jpg",
     "image/jpeg": "jpeg",
     "image/png": "png"
};

// (error: null | Error, filename: string) => void
// Express.Multer.File
const fileUploader = multer({

     limits: 5000000,
     storage: multer.diskStorage({

          destination: (req: Request, file: Express.Multer.File, cb: (error: null | Error, destination: string) => void) => {
               cb(null, "dist/uploads/images");
          },

          filename: (req: Request, file: Express.Multer.File, cb: (error: null | Error, filename: string) => void) => {
               const extension = FILETYPE[file.mimetype];
               cb(null, (Math.random() * Math.random()) + "." + extension);
          }

     }),

     fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
          const isValid = !!FILETYPE[file.mimetype];

          cb(null, isValid);

     }

});

module.exports = fileUploader;