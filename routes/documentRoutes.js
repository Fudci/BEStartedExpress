const { postDoc, postDocMultiple } = require("../controllers/documents");
var multer = require("multer");
const upload = multer({ dest: "uploads/" });

const express = require("express");
const router = express.Router();

router.post("/doc", upload.single("files"), postDoc);
router.post("/docmul", upload.array("files", 10), postDocMultiple);

module.exports = router;
