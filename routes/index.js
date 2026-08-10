const router = require("express").Router();

const {
  validateLoginBody,
  validateUserBody,
} = require("../middlewares/validation");

const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const NotFoundError = require("../errors/not-found-error");

const { login, createUser } = require("../controllers/users");

router.post("/signin", validateLoginBody, login);

router.post("/signup", validateUserBody, createUser);

router.use("/items", clothingItemsRouter);

router.use("/users", usersRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
