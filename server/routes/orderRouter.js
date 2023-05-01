const Router = require("express");
const router = new Router();
const customerOrderRouter = require("./customerOrderRouter");
//const executorOrderRouter = require("./executorOrderRouter");

//router.use("/executor", executorOrderRouter);
router.use("/customer", customerOrderRouter);

module.exports = router;
