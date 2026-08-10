const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  // Allow CORS preflight requests through
  if (req.method === "OPTIONS") {
    return next();
  }

  const { authorization } = req.headers;

  // Check that authorization header exists
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization required");
  }

  // Remove "Bearer " from token
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError("Authorization required");
  }

  // Attach user info to request
  req.user = payload;

  return next();
};
