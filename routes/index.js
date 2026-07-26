const router = require("express").Router();

const auth = require("../middlewares/auth");

const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItemsRouter);

router.use(auth);

router.use("/users", usersRouter);

module.exports = router;
