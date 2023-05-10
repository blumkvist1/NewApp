const {
  Order,
  ExecutorOrder,
  CustomerOrder,
  User,
} = require("../models/model");
const ApiError = require("../error/ApiError");

class CustomerOrderController {
  async create(req, res) {
    const { discription, theme, phone, important, place, status } = req.body;
    const { userId } = req.params;
    let order = await Order.create({
      discription,
      theme,
      phone,
      important,
      place,
      status,
    });
    const customer_order = await CustomerOrder.create({
      orderId: order.id,
      userId,
    });

    order.set({
      customerOrderId: customer_order.id,
    });
    order = await order.save();

    return res.json(order);
  }

  async getAllCustomerOrders(req, res) {
    const { userId } = req.params;

    try {
      let userOrders = [];
      const orders = await CustomerOrder.findAll({
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
      include: [
        { model: CustomerOrder, include: [{ model: User }] },
        { model: ExecutorOrder, include: [{ model: User }] },
      ],
    });
    return res.json(order);
  }
}

module.exports = new CustomerOrderController();
