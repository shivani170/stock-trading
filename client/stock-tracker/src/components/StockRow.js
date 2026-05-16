import { useState, useEffect } from "react";

const StockRow = ({ ticker }) => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/stocks/quote/${ticker}`)
      .then((res) => res.json())
      .then((data) => {
        setStockData(data);
      });
  }, [ticker]);
  console.log("Stock data", stockData);

  return (
    <tr>
      <td>{stockData?.symbol}</td>
      <td>{stockData?.high}</td>
      <td>{stockData?.low}</td>
      <td>{stockData?.open}</td>
      <td>{stockData?.prevClose}</td>
    </tr>
  );
};

export default StockRow;
