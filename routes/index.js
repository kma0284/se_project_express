const router = require("express").Router();

const auth = require("../middlewares/auth");

const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

const { NOT_FOUND } = require("../utils/errors");

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);

// Public GET /items
router.use("/items", clothingItemsRouter);

// Protect everything after this
router.use(auth);

router.use("/users", usersRouter);

router.use((req, res) =>
  res.status(NOT_FOUND).send({
    message: "Requested resource not found",
  })
);

module.exports = router;
