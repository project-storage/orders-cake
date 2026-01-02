import http from "./http-common";

const getStatusAll = () => {
  return http.get("/api/status/all");
};

const createStatus = (statusData) => {
  return http.post("/api/status/create", statusData);
};

const updateStatus = (id, statusData) => {
  return http.put(`/api/status/update/${id}`, statusData);
};

const deleteStatus = (id) => {
  return http.delete(`/api/status/delete/${id}`);
};

const statusService = {
  getStatusAll,
  createStatus,
  updateStatus,
  deleteStatus,
};

export default statusService;