import http from './http-common'

const getUserInfo = () => {
    const token = localStorage.getItem("token");
    http.defaults.headers.common["Authorization"] = token;

    return http.get("/api/user/user-info");
};

const postLogin = (loginData) => {
    return http.post(`/api/user/login`, loginData)
}



const UserService = {
    postLogin,
    getUserInfo
}

export default UserService