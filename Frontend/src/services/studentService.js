import http from "./http-common";

const createStudent = (studentData) => {
  return http.post("/api/student/create", studentData);
};

const getStudentInfo = () => {
  return http.get("/api/student/info");
};

const getStudentAll = () => {
  return http.get("/api/student/all");
};

const searchStudent = (query) => {
  return http.get("/api/student/search", { params: query });
};

const updateStudent = (id, studentData) => {
  return http.put(`/api/student/update/${id}`, studentData);
};

const deleteStudent = (id) => {
  return http.delete(`/api/student/delete/${id}`);
};

const studentService = {
  createStudent,
  getStudentInfo,
  getStudentAll,
  searchStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;