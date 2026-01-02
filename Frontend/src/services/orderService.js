import http from "./http-common";

const createOrder = (orderData) => {
  return http.post("/api/order/create", orderData);
};

const getAllOrders = () => {
  return http.get("/api/order/");
};

const getOrderById = (id) => {
  return http.get(`/api/order/${id}`);
};

const updateOrder = (id, orderData) => {
  return http.put(`/api/order/${id}`, orderData);
};

const deleteOrder = (id) => {
  return http.delete(`/api/order/${id}`);
};

const getOrdersByStudentId = (stuID) => {
  return http.get(`/api/order/student/${stuID}`);
};

const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByStudentId,
};

export default orderService;