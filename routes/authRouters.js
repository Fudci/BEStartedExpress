const { register, login } = require("../controllers/auth");
const multerHelper = require("../util/multerHelp");

const express = require("express");
const router = express.Router();

router.post("/register", multerHelper.single("files"),register);
router.post("/login", login);

module.exports = router;
