require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { appDataSource } = require("./models/appDataSource");
const { globalErrorHandler } = require("./utills/error");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening to ${PORT}`));

    await appDataSource.initialize();
    console.log("✅✅✅Data Source has been initialized!✅✅✅");
  } catch (err) {
    console.error("❌❌❌Failed Initialzed❌❌❌");
    throw err;
  }
};

start();
