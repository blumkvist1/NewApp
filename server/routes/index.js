const Router = require("express");
const router = new Router();
const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");

router.use("/", orderRouter);
router.use("/", orderRouter);
router.use("/user", userRouter);

module.exports = router;
