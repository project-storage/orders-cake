import http from './http-common'

const postLogin = (loginData) => {
    return http.post(`/api/users/login`, loginData)
}

const LoginService = {
    postLogin
}

export default LoginService