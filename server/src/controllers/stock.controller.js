const stockService = require("../services/stock.service");

exports.getQuote = async (req, res) => {
  try {
    const data = await stockService.getQuote(req.params.symbol);

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCandles = async (req, res) => {
  try {
    const data = await stockService.getCandles(req.params.symbol);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchStocks = async (req, res) => {
  try {
    const data = await stockService.searchStocks(req.query.q);

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
