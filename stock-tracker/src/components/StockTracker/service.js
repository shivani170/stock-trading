const BASE = "http://localhost:8080/api/stocks";

export const getStockData = (ticker) =>
  fetch(`${BASE}/quote/${ticker}`).then((res) => res.json());

export const getCandles = (ticker) =>
  fetch(`${BASE}/candles/${ticker}`).then((res) => res.json());

export const searchStocks = (query) =>
  fetch(`${BASE}/search?q=${query}`).then((res) => res.json());
