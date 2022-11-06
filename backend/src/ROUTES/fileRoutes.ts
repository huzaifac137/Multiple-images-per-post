const express = require("express");
const router = express.Router();
const postpics = require("../CONTROLLERS/fileControllers").postPics;
const fileUploader = require("../UPLOADER/multer");
const getpics = require("../CONTROLLERS/fileControllers").getPics;

router.get("/", getpics);
router.post("/upload", fileUploader.array("files"), postpics);

module.exports = router;