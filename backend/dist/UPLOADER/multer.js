"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
;
const FILETYPE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png"
};
// (error: null | Error, filename: string) => void
// Express.Multer.File
const fileUploader = multer({
    limits: 5000000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "dist/uploads/images");
        },
        filename: (req, file, cb) => {
            const extension = FILETYPE[file.mimetype];
            cb(null, (Math.random() * Math.random()) + "." + extension);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!FILETYPE[file.mimetype];
        cb(null, isValid);
    }
});
module.exports = fileUploader;
