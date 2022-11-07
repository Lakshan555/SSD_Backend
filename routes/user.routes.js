const { register, login } = require("../controllers/user.controller");
const { roleValidator } = require("../middlewares/roleValidator");

const userRouter = require("express").Router();

userRouter.post("/login", login);
userRouter.post("/register", register);

module.exports = userRouter;