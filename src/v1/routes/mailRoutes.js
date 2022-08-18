const express = require("express");
const router = express.Router();
const mailController = require("../../controllers/mailController");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/", upload.single("file"), mailController.sendNewMail);

module.exports = router;
