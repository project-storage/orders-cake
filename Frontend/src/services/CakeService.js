import http from './http-common'

const createCake = (cakeData) => {
    return http.post(`/api/cakes/create`, cakeData)
}

const getAllCakes = () => {
    return http.get(`/api/cakes/all`)
}

const getCakeById = (id) => {
    return http.get(`/api/cakes/info/${id}`).then((response) => {
        return response;
    });
}
const deleteCake = (id) => {
    return http.delete(`/api/cakes/delete/${id.toString()}`)
}

const updateCake = (id, updateCake) => {
    return http.post(`/api/cakes/update/${id}`, updateCake)
}

const CakeService = {
    createCake,
    getAllCakes,
    getCakeById,
    deleteCake,
    updateCake

}

export default CakeService