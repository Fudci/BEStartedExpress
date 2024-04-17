var multer = require("multer");
const multerHelper = multer({ storage: multer.memoryStorage() });

module.exports = multerHelper;
