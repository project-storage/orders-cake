import http from './http-common'

// const getTeacherInfo = () => {
//     const token = localStorage.getItem("token");
//     http.defaults.headers.common["Authorization"] = token;

//     return http.get("/api/teachers/info");
// };

const getAllTeacher = ()=>{
    return http.get('/api/teachers/all')
}
const TeacherService = {
    // getTeacherInfo,
    getAllTeacher
  
}

export default TeacherService