import http from './http-common'

const createDepartment = (departmentData) => {
    return http.post(`/api/departments/create`, departmentData)
}

const getAllDepartment = () => {
    return http.get(`/api/departments/all`)
}

const deleteDepartment = (id) => {
    return http.delete(`/api/departments/delete/${id}`)
}

const updateDepartment = (id, updateData) => {
    return http.post(`/api/departments/update/${id.toString()}`, updateData)
}

const DepartmentService = {
    createDepartment,
    getAllDepartment,
    deleteDepartment,
    updateDepartment

}

export default DepartmentService