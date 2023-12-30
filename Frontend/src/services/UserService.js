import http from './http-common'

const postLogin = (loginData)=>{
    return http.post(`/api/user/login`,loginData)
}

const UserService={
    postLogin
}

export default UserService