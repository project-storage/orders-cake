import http from "./http-common";

interface DepartmentData {
  departCode: string;
  departName: string;
}

interface DepartmentResponse {
  data: DepartmentData[];
}

const create = (departmentData: DepartmentData) => {
  return http.post<DepartmentData>(`/api/departments/create`, departmentData);
};

const getAll = () => {
  return http.get<DepartmentResponse>(`/api/departments/all`);
};

const getById = (id: string) => {
  return http.get<DepartmentData>(`/api/departments/info/${id}`);
};

const deleteById = (id: string) => {
  return http.delete<void>(`/api/departments/delete/${id.toString()}`);
};

const updateById = (id: string, updateDepartment: Partial<DepartmentData>) => {
  return http.put<DepartmentData>(
    `/api/departments/update/${id}`,
    updateDepartment
  );
};

const DepartmentService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};

export default DepartmentService;
