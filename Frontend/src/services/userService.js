import http from "./http-common";

const getUserInfo = () => {
  return http.get("/api/user/info");
};

const getUserAll = () => {
  return http.get("/api/user/all");
};

const searchUser = (query) => {
  return http.get("/api/user/search", { params: query });
};

const updateUser = (id, userData) => {
  return http.put(`/api/user/update/${id}`, userData);
};

const deleteUser = (id) => {
  return http.delete(`/api/user/delete/${id}`);
};

const userService = {
  getUserInfo,
  getUserAll,
  searchUser,
  updateUser,
  deleteUser,
};

export default userService;