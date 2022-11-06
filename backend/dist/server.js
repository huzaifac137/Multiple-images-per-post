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
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/dist/uploads/images", express.static(path.join("dist", "uploads", "images")));
const fileRoutes = require("./ROUTES/fileRoutes");
app.use("/api/files", fileRoutes);
app.use((req, res, next) => {
    res.status(404);
    res.json({ message: "ROUTE NOT FOUND" });
});
app.use((err, req, res, next) => {
    if (req.files) {
        const filess = req.files.map((file) => file.path);
        for (let i = 0; i < filess.length; i++) {
            fs.unlink(filess[i], () => { });
        }
    }
    if (res.headersSent) {
        return next(err);
    }
    // console.log("ERROR CODE : " + err.code);
    res.status(500);
    res.json({ message: err.message || "SOMETHING WENT WRONG" });
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.MONGO_URL);
        console.log("MONGOOSE CONNECTED");
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("ERROR IS : " + err.message);
        }
    }
});
connectDB();
app.listen(process.env.PORT);
