import http from './http-common'

const getUserInfo = () => {
    const token = localStorage.getItem("token");
    http.defaults.headers.common["Authorization"] = token;

    return http.get("/api/users/info");
};

const postLogin = (loginData) => {
    return http.post(`/api/user/login`, loginData)
}

const getAllUser = () => {
    return http.post(`/api/users/all`)
}



const UserService = {
    postLogin,
    getUserInfo,
    getAllUser
}

export default UserService