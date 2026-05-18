import { useState, useEffect } from "react";
import StockRow from "./StockRow";
import "./stock.scss";

const TICKERS = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT", "INTC", "META"];

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="header-time">
      {time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </span>
  );
};

const StockWrapper = () => (
  <div className="stock-app">
    <div className="watchlist-wrapper">
      <div className="watchlist-header">
        <div className="header-left">
          <span className="live-badge">
            <span className="dot" />
            LIVE
          </span>
          <h2>Watchlist</h2>
        </div>
        <Clock />
      </div>

      <div className="stock-grid">
        {TICKERS.map((ticker) => (
          <StockRow key={ticker} ticker={ticker} />
        ))}
      </div>
    </div>
  </div>
);

export default StockWrapper;
