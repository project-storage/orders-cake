import http from "../service/http-common"

const getAll = () => {
    return http.get('/all-cake')
}

export const CakeService = {
    getAll
}