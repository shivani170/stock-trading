const express = require("express");
const router = express.Router();

const { getQuote, getCandles, searchStocks } = require("../controllers/stock.controller");

router.get("/quote/:symbol", getQuote);
router.get("/candles/:symbol", getCandles);
router.get("/search", searchStocks);

module.exports = router;
