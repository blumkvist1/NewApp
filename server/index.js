require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const models = require("./models/model");
const router = require("./routes/index.js");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
