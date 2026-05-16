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
    symbol,
    current: response.data.c,
    high: response.data.h,
    low: response.data.l,
    open: response.data.o,
    prevClose: response.data.pc,
  };
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
