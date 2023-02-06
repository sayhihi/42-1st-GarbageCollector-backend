require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const typeorm = require("typeorm");

const app = express();

const { DataSource } = require("typeorm");
const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening to ${PORT}`));
    appDataSource.initialize().then(() => {
      console.log("✅✅✅Data Source has been initialized!✅✅✅");
    });
  } catch (err) {
    console.error("❌❌❌Failed Initialzed❌❌❌");
    throw err;
  }
};

start();
