const { SERVER_ERROR, BAD_REQUEST } = require("../utils/errors");

module.exports = (err, req, res) => {
  console.error(err);

  // Celebrate validation errors
  if (err.name === "CelebrateError") {
    const message =
      err.details.get("body")?.message ||
      err.details.get("params")?.message ||
      err.details.get("query")?.message ||
      "Invalid request";

    return res.status(BAD_REQUEST).send({
      message,
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({
      message: err.message,
    });
  }

  // Invalid MongoDB ID
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({
      message: "Invalid ID format",
    });
  }

  // Your custom errors
  const { statusCode = SERVER_ERROR, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === SERVER_ERROR
        ? "An error has occurred on the server"
        : message,
  });
};
