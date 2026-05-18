const axios = require("axios");

const BASE_URL = "https://finnhub.io/api/v1";

exports.getQuote = async (symbol) => {
  const response = await axios.get(`${BASE_URL}/quote`, {
    params: {
      symbol,
      token: process.env.FINNHUB_API_KEY,
    },
  });

  return {
    ...response.data,
    symbol,
    current: response.data.c,
    high: response.data.h,
    low: response.data.l,
    open: response.data.o,
    prevClose: response.data.pc,
    date: new Date(response.data.t * 1000).toLocaleDateString(),
    time: new Date(response.data.t * 1000).toLocaleTimeString(),
  };
};

exports.getCandles = async (symbol) => {
  const response = await axios.get(
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
    {
      params: { interval: "1d", range: "1mo" },
      headers: { "User-Agent": "Mozilla/5.0" },
    }
  );

  const result = response.data?.chart?.result?.[0];
  if (!result) return [];

  const timestamps = result.timestamp;
  const closes = result.indicators.quote[0].close;

  return timestamps.map((ts, i) => ({
    date: new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    price: closes[i] != null ? parseFloat(closes[i].toFixed(2)) : null,
  })).filter((d) => d.price !== null);
};

exports.searchStocks = async (query) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      q: query,
      token: process.env.FINNHUB_API_KEY,
    },
  });

  return response.data.result;
};
