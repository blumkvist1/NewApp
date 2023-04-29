const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const { databaseVersion } = require("../db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "CUSTOMER" },
  full_name: { type: DataTypes.TEXT, allowNull: false },
});

const CustomerOrder = sequelize.define("customer_order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ExecutorOrder = sequelize.define("executor_order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  discription: { type: DataTypes.TEXT, allowNull: false },
  theme: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  important: { type: DataTypes.STRING, allowNull: false },
  place: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "В обработке" },
});

User.hasMany(CustomerOrder);
CustomerOrder.belongsTo(User);

User.hasMany(ExecutorOrder);
ExecutorOrder.belongsTo(User);

Order.hasOne(CustomerOrder);
CustomerOrder.belongsTo(Order);

Order.hasOne(ExecutorOrder);
ExecutorOrder.belongsTo(Order);

ExecutorOrder.hasOne(Order)
Order.belongsTo(ExecutorOrder)

CustomerOrder.hasOne(Order)
Order.belongsTo(CustomerOrder)

module.exports = {
	User,
	ExecutorOrder,
	CustomerOrder,
	Order
}