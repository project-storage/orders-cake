import http from './http-common'

const Login = (loginData) => {
    return http.post(`/api/users/login`, loginData)
}

const Register = (userData) => {
    return http.post("/api/users/register", userData);
}

const AuthService = {
    Login,
    Register
}

export default AuthService