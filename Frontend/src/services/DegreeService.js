import http from './http-common'

const createDegree= (departmentData) => {
    return http.post(`/api/degrees/create`, departmentData)
}

const getAllDegree = () => {
    return http.get(`/api/degrees/all`)
}

const deleteDegree = (id) => {
    return http.delete(`/api/degrees/delete/${id}`)
}

const updateDegree = (id, updateData) => {
    return http.post(`/api/degrees/update/${id.toString()}`, updateData)
}

const DegreeService = {
    createDegree,
    getAllDegree,
    deleteDegree,
    updateDegree

}

export default DegreeService