const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.random(Math.random * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const uploadDir = "../uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

router.route("/upload").post(upload.single("file"), async (req, res) => {
  try {
    res.send({ message: "File Upload SuccessFully", file: req.file});
  } catch (error) {
    res.status(500).send({error: "Error to FilSe Upload"})
  }
});

module.exports = router;
