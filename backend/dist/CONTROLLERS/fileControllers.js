"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FILE = require("../MODELS/file");
const postPics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const recievedfiles = req.files;
    const { title, price, description } = req.body;
    const files = recievedfiles.map((file) => file.path);
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
});
const getPics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = parseInt((req.query).skip) || 0;
    const limitPerView = 3;
    let files;
    try {
        files = yield FILE.find({}).limit(limitPerView).skip(skip);
    }
    catch (err) {
        const error = new Error("SOMETHING WENT WRONG ");
        error.code = 500;
        return next(error);
    }
    res.status(200).json({ files: files });
});
exports.getPics = getPics;
exports.postPics = postPics;
