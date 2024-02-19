import http from './http-common'

const getUserInfo = () => {
    const token = localStorage.getItem("token");
    http.defaults.headers.common["Authorization"] = token;

    return http.get("/api/users/info");
};

const UserService = {
    getUserInfo
}

export default UserService