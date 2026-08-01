const router = require("express").Router();

// const auth = require("../middlewares/auth");

const {
  validateLoginBody,
  validateUserBody,
} = require("../middlewares/validation");

const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

router.post("/signin", validateLoginBody, login);

router.post("/signup", validateUserBody, createUser);

router.use("/items", clothingItemsRouter);

// router.use(auth);

router.use("/users", usersRouter);

module.exports = router;
