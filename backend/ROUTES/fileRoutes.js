const express = require("express");
const router = express.Router();
const postPics = require("../CONTROLLERS/fileControllers").postPics;
const fileUploader = require("../UPLOADER/multer");
const getPics = require("../CONTROLLERS/fileControllers").getPics;

router.get("/" , getPics);
router.post("/upload" , fileUploader.array("files") ,  postPics);

module.exports = router;