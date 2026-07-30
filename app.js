const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

// Logs every incoming request
app.use(requestLogger);

app.use(routes);

// Celebrate error handler
app.use(errors());

// Logs server errors
app.use(errorLogger);

// Central error handler
app.use(errorHandler);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
