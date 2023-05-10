import { $authHost } from "./index";

export const fetchOrders = async (userId) => {
  const { data } = await $authHost.get(`api/customer/${userId}/orders`);
  return data;
};

export const createOrder = async (order, userId) => {
  const { data } = await $authHost.post(
    "api/customer/" + userId + "/create_order",
    {
      theme: order.theme,
      discription: order.discription,
      phone: order.phone,
      place: order.place,
      status: order.status,
      important: order.important,
    }
  );
  return data;
};

export const fetchOneOrder = async (orderId) => {
  const { data } = await $authHost.get(`api/customer/orders/` + orderId);
  return data;
};

export const fetchAllOrders = async (userId) => {
  const { data } = await $authHost.get(`api/executor/orders`);
  return data;
};

export const fetchExecutorOrders = async (userId) => {
  const { data } = await $authHost.get(`api/executor/${userId}/orders`);
  return data;
};

export const changeStatus = async (status, orderId, userId) => {
  const { data } = await $authHost.post(
    `api/executor/${userId}/change_status_order`,
    {
      orderId: orderId,
      status: status,
    }
  );
  return data;
};
