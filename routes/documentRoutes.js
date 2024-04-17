const { postDoc, postDocMultiple } = require("../controllers/documents");

const express = require("express");
const multerHelper = require("../util/multerHelp");
const router = express.Router();

router.post("/doc", multerHelper.single("files"), postDoc);
router.post("/docmul", multerHelper.array("files", 10), postDocMultiple);

module.exports = router;
