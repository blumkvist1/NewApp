const { Order, ExecutorOrder, CustomerOrder } = require("../models/model");
const ApiError = require("../error/ApiError");

class ExecutorOrderController {
  async changeStatusOrder(req, res) {}

  async getAllOrders(req, res) {}

  async getAllExecutorOrders(req, res) {}

  async getOne(req, res) {}
}

module.exports = new ExecutorOrderController();
