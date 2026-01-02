import http from "./http-common";

const create = (cakeData) => {
  return http.post(`/api/cakes/create`, cakeData);
};

const getAll = () => {
  return http.get(`/api/cakes/all`);
};

const getById = (id) => {
  return http.get(`/api/cakes/info/${id}`);
};

const deleteById = (id) => {
  return http.delete(`/api/cakes/delete/${id}`);
};

const updateById = (id, updateCake) => {
  return http.put(`/api/cakes/update/${id}`, updateCake);
};

const CakeService = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};

export default CakeService;
