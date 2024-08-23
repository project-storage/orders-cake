import http from "./http-common";

interface CakeData {
  id: string;
  cakeName: string;
  price: string;
}

interface CakeResponse {
  data: CakeData[];
}

const create = (cakeData: CakeData) => {
  return http.post<CakeData>(`/api/cakes/create`, cakeData);
};

const getAll = () => {
  return http.get<CakeResponse>(`/api/cakes/all`);
};

const getById = (id: string) => {
  return http.get<CakeData>(`/api/cakes/info/${id}`);
};

const deleteById = (id: string) => {
  return http.delete<void>(`/api/cakes/delete/${id}`);
};

const updateById = (id: string, updateCake: Partial<CakeData>) => {
  return http.put<CakeData>(`/api/cakes/update/${id}`, updateCake);
};

const CakeService = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};

export default CakeService;
