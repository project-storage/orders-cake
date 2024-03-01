import http from './http-common'

const createDegree = (departmentData) => {
    return http.post(`/api/degrees/create`, departmentData)
}

const getAllDegree = () => {
    return http.get(`/api/degrees/all`)
}

const getDegreeById = (id) => {
    return http.get(`/api/degrees/info/${id}`).then((response) => {
        return response;
    });
}

const deleteDegree = (id) => {
    return http.delete(`/api/degrees/delete/${id.toString()}`)
}

const updateDegree = (id, updateData) => {
    return http.put(`/api/degrees/update/${id.toString()}`, updateData)
}

const DegreeService = {
    createDegree,
    getAllDegree,
    getDegreeById,
    deleteDegree,
    updateDegree

}

export default DegreeService