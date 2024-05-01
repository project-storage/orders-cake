import http from './http-common'

const getUserInfo = () => {
    const token = localStorage.getItem("token");
    http.defaults.headers.common["Authorization"] = token;

    return http.get("/api/users/info");
};

const getUserById = (id) => {
    return http.get(`/api/users/search?id=${id}`)
}

const getUseTeacher = () => {
    return http.get(`/api/users/search?role=ครูที่ปรึกษา`)
}

const getAllUser = () => {
    return http.get(`/api/users/all`)
}

const getSearchAdmin = () => {
    return http.get(`/api/users/search?role=admin`);
}

const postLogin = (loginData) => {
    return http.post(`/api/user/login`, loginData)
}

const createUser = (userData) => {
    return http.post("/api/users/register", userData);
}
const updateUser = (id, updateUser) => {
    return http.put(`/api/users/update/${id}`, updateUser)
}

const deleteUser = (id) => {
    return http.delete(`/api/users/delete/${id.toString()}`)
}

const UserService = {
    createUser,
    postLogin,
    getUserInfo,
    getUserById,
    getUseTeacher,
    getSearchAdmin,
    getAllUser,
    updateUser,
    deleteUser
}

export default UserService