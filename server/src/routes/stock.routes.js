const express = require("express");
const router = express.Router();

const { getQuote, searchStocks } = require("../controllers/stock.controller");

router.get("/quote/:symbol", getQuote);
router.get("/search", searchStocks);

module.exports = router;
