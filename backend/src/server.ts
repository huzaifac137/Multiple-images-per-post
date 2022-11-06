import { NextFunction, Request, Response, Express } from "express";



const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/dist/uploads/images", express.static(path.join("dist", "uploads", "images")));

const fileRoutes = require("./ROUTES/fileRoutes");

app.use("/api/files", fileRoutes);


app.use((req: Request, res: Response, next: NextFunction) => {

    res.status(404);
    res.json({ message: "ROUTE NOT FOUND" });

});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {


    if (req.files) {

        const filess = (req.files as { path: string }[]).map((file) => file.path);

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

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGOOSE CONNECTED");
    }

    catch (err) {
        if (err instanceof Error) {
            console.log("ERROR IS : " + err.message);
        }

    }


};

connectDB();


app.listen(process.env.PORT);



