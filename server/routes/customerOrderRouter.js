const Router = require("express");
const router = new Router();
const customerOrderController = require("../controllers/customerOrderController.js");

router.post("/:userId/create_order", customerOrderController.create);
router.get("/:userId/orders", customerOrderController.getAllCustomerOrders);
router.get("/orders/:id", customerOrderController.getOne);
module.exports = router;
