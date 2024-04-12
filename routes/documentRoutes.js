const { postDoc } = require("../controllers/documents");
var multer = require("multer");
const upload = multer({ dest: "uploads/" });

const express = require("express");
const router = express.Router();

router.post("/doc", upload.single("avatar"), postDoc);

module.exports = router;
