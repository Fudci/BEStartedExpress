const { postDoc, postDocMultiple } = require("../controllers/documents");
var multer = require("multer");
const minioMulter = multer({ storage: multer.memoryStorage() });

const express = require("express");
const router = express.Router();

router.post("/doc", minioMulter.single("files"), postDoc);
router.post("/docmul", minioMulter.array("files", 10), postDocMultiple);

module.exports = router;
