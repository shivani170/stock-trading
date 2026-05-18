import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { getCandles } from "./service";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="tooltip-date">{label}</div>
      <div className="tooltip-price">${payload[0].value.toFixed(2)}</div>
    </div>
  );
};

const StockChart = ({ ticker, isPositive }) => {
  const [candles, setCandles] = useState(null);

  useEffect(() => {
    getCandles(ticker).then(setCandles);
  }, [ticker]);

  if (!candles) {
    return <div className="chart-skeleton" />;
  }

  if (!Array.isArray(candles) || candles.length === 0) {
    return <div className="chart-empty">No chart data</div>;
  }

  const color = isPositive ? "#00d964" : "#ff4757";
  const gradientId = `grad-${ticker}`;
  const firstPrice = candles[0]?.price;

  // Show every 5th label to avoid crowding
  const tickFormatter = (_, i) =>
    i % 5 === 0 && candles[i] ? candles[i].date : "";

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart
          data={candles}
          margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            tick={{ fill: "#555", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
            interval={0}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: "#555", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v.toFixed(0)}`}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={firstPrice} stroke="#333" strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
