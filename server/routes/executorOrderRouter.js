const Router = require("express");
const router = new Router();
const executorOrderController = require("../controllers/executorOrderController");

router.post(
  "/:userId/change_status_order",
  executorOrderController.changeStatusOrder
);
router.get("/:userId/orders", executorOrderController.getAllExecutorOrders);
router.get("/orders", executorOrderController.getAllOrders);
router.get("/orders/:id", executorOrderController.getOne);
module.exports = router;
