const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const stockRoutes = require("./routes/stock.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/stocks", stockRoutes);

module.exports = app;
