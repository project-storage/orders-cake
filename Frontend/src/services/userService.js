import http from "./http-common";

const getUserInfo = () => {
  return http.get("/api/users/info");
};

const getUserAll = () => {
  return http.get("/api/users/all");
};

const searchUser = (query) => {
  return http.get("/api/users/search", { params: query });
};

const updateUser = (id, userData) => {
  return http.put(`/api/users/update/${id}`, userData);
};

const deleteUser = (id) => {
  return http.delete(`/api/users/delete/${id}`);
};

const userService = {
  getUserInfo,
  getUserAll,
  searchUser,
  updateUser,
  deleteUser,
};

export default userService;