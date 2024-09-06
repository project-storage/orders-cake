import http from "./http-common";

interface degreetData {
  id: string;
  departName: string;
}

interface degreeResponse {
  data: degreetData[];
}
const create = (degreetData: degreetData) => {
  return http.post<degreetData>(`/api/degrees/create`, degreetData);
};

const getAll = () => {
  return http.get<degreeResponse>(`/api/degrees/all`);
};

const getById = (id: string) => {
  return http.get<degreetData>(`/api/degrees/info/${id}`);
};

const deleteById = (id: string) => {
  return http.delete<void>(`/api/degrees/delete/${id}`);
};

const updateById = (id: string, updateData: Partial<degreetData>) => {
  return http.put<degreetData>(`/api/degrees/update/${id}`, updateData);
};

const DegreeService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};

export default DegreeService;
