import http from './http-common'

const createCake = (cakeData) => {
    return http.post(`/api/cakes/create`, cakeData)
}

const getAllCakes = () => {
    return http.get(`/api/cakes/all`)
}

const deleteCake = (id) => {
    return http.delete(`/api/cakes/delete/${id}`)
}

const updateCake = (id) => {
    return http.post(`/api/cakes/update/${id}`, cakeData)
}

const CakeService = {
    createCake,
    getAllCakes,
    deleteCake,
    updateCake

}

export default CakeService