const { Order, ExecutorOrder, CustomerOrder } = require("../models/model");
const ApiError = require("../error/ApiError");

class ExecutorOrderController {
  async changeStatusOrder(req, res) {
    const { status, orderId } = req.body;
    const { userId } = req.params;
    let order = await Order.findOne({ where: { id: orderId } });

    const [executor_order, created] = await ExecutorOrder.findOrCreate({
      where: { orderId: order.id, userId: userId },
    });
    if (created) {
      order.set({
        executorOrderId: executor_order.id,
        status: status,
      });
    } else {
      order.set({
        status: status,
      });
    }
    order = await order.save();

    return res.json(order);
  }

  async getAllOrders(req, res) {
    const orders = await Order.findAll({
      where: {
        status: "В обработке",
      },
    });
    return res.json(orders);
  }

  async getAllExecutorOrders(req, res) {
    const { userId } = req.params;

    try {
      let userOrders = [];
      const orders = await ExecutorOrder.findAll({
        where: { userId },
        include: [{ model: Order }],
      });
      orders.map((order) => {
        userOrders.push(order.order);
      });
      return res.json(userOrders);
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
    });
    return res.json(order);
  }
}

module.exports = new ExecutorOrderController();
