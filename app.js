const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6a592f5d85ce021d3bf2a5aa",
  };

  next();
});

const routes = require("./routes");

app.use(routes);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
