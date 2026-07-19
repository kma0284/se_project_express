const router = require("express").Router();

const {
  getUsers,
  getCurrentUser,
  createUser,
  login,
  updateProfile,
} = require("../controllers/users");

router.post("/signin", login);

// Depending on your app.js, signup may be "/signup" instead of "/"
router.post("/signup", createUser);

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.patch("/me", updateProfile);

module.exports = router;