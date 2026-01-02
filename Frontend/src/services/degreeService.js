import http from "./http-common";

const create = (degreetData) => {
  return http.post(`/api/degrees/create`, degreetData);
};

const getAll = () => {
  return http.get(`/api/degrees/all`);
};

const getById = (id) => {
  return http.get(`/api/degrees/info/${id}`);
};

const deleteById = (id) => {
  return http.delete(`/api/degrees/delete/${id}`);
};

const updateById = (id, updateData) => {
  return http.put(`/api/degrees/update/${id}`, updateData);
};

const DegreeService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};

export default DegreeService;
