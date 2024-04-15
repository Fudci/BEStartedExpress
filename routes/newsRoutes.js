const { newsAll, paginationNews } = require("../controllers/news");

const express = require("express");
const router = express.Router();

router.get("/news", newsAll);
router.get("/newspagination", paginationNews);

module.exports = router;
