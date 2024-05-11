import http from './http-common'

const create = (departmentData) => {
    return http.post(`/api/degrees/create`, departmentData)
}

const getAll = () => {
    return http.get(`/api/degrees/all`)
}

const getById = (id) => {
    return http.get(`/api/degrees/info/${id}`).then((response) => {
        return response;
    });
}

const deleteById = (id) => {
    return http.delete(`/api/degrees/delete/${id.toString()}`)
}

const updateById = (id, updateData) => {
    return http.put(`/api/degrees/update/${id.toString()}`, updateData)
}

const DegreeService = {
    create,
    getAll,
    getById,
    updateById,
    deleteById

}

export default DegreeService