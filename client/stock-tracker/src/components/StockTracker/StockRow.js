import { useState, useEffect } from "react";
import { getStockData } from "./service";
import StockChart from "./StockChart";
import { COMPANY_NAMES } from "./constants";
import { fmt } from "./utils";
import { SkeletonRow } from "./SkeletonRow";
import { StatBox } from "./StatBox";

const StockRow = ({ ticker }) => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    getStockData(ticker).then(setStockData);
  }, [ticker]);

  if (!stockData) return <SkeletonRow />;

  const isPositive = stockData.dp >= 0;
  const changeClass = isPositive ? "positive" : "negative";
  const arrow = isPositive ? "▲" : "▼";
  const sign = isPositive ? "+" : "";

  const dayRange = `$${fmt(stockData.low)} – $${fmt(stockData.high)}`;
  const changeFromOpen =
    stockData.current != null && stockData.open != null
      ? stockData.current - stockData.open
      : null;
  const changeFromOpenPct =
    stockData.open != null && changeFromOpen != null
      ? (changeFromOpen / stockData.open) * 100
      : null;

  return (
    <div className="stock-card">
      {/* ── top row: badge + name + price ── */}
      <div className="row-main">
        <div className="symbol-badge">{ticker}</div>

        <div className="stock-info">
          <div className="company-name">{COMPANY_NAMES[ticker] ?? ticker}</div>
          <div className="ticker-meta">
            <span className="exchange">NASDAQ</span>
            <span className="dot-sep">·</span>
            <span className="asset-type">Equity</span>
          </div>
        </div>

        <div className="price-block">
          <div className="price">${fmt(stockData.current)}</div>
          <div className={`change-row ${changeClass}`}>
            <span className="arrow">{arrow}</span>
            <span className="change-val">
              {sign}
              {fmt(stockData.d)}
            </span>
            <span className="change-pct">
              ({sign}
              {stockData.dp?.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* ── 30-day area chart ── */}
      <StockChart ticker={ticker} isPositive={isPositive} />

      {/* ── all stats grid ── */}
      <div className="stats-grid">
        <StatBox label="Open" value={`$${fmt(stockData.open)}`} />
        <StatBox label="Prev Close" value={`$${fmt(stockData.prevClose)}`} />
        <StatBox
          label="Day High"
          value={`$${fmt(stockData.high)}`}
          highlight="green"
        />
        <StatBox
          label="Day Low"
          value={`$${fmt(stockData.low)}`}
          highlight="red"
        />
        <StatBox label="Day Range" value={dayRange} />
        <StatBox
          label="Chg from Open"
          value={
            changeFromOpen != null
              ? `${changeFromOpen >= 0 ? "+" : ""}${fmt(changeFromOpen)} (${changeFromOpenPct >= 0 ? "+" : ""}${changeFromOpenPct?.toFixed(2)}%)`
              : "—"
          }
          highlight={changeFromOpen >= 0 ? "green" : "red"}
        />
      </div>

      {/* ── timestamp ── */}
      <div className="row-footer">
        <span className="footer-label">Last updated</span>
        <span className="footer-val">
          {stockData.date} · {stockData.time}
        </span>
      </div>
    </div>
  );
};

export default StockRow;
