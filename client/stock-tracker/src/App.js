import "bootstrap/dist/css/bootstrap.min.css";
import StockRow from "./components/StockRow";
function App() {
  return (
    <div className="App">
      <div className="container">
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <StockRow ticker="AAPL" />
              {/* <StockRow ticker="TSLA" />
              <StockRow ticker="GOOGL" />
              <StockRow ticker="AMZN" /> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
