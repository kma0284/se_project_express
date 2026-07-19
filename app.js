const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use(routes);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
