import http from './http-common'

const createDepartment = (departmentData) => {
    return http.post(`/api/departments/create`, departmentData)
}

const getAllDepartment = () => {
    return http.get(`/api/departments/all`)
}

const getDepartmentById = (id) => {
    return http.get(`/api/departments/info/${id}`).then((response) => {
        return response;
    });
}

const deleteDepartment = (id) => {
    return http.delete(`/api/departments/delete/${id.toString()}`)
}

const updateDepartment = (id, updateDepartment) => {
    return http.put(`/api/departments/update/${id}`, updateDepartment)
}

const DepartmentService = {
    createDepartment,
    getAllDepartment,
    getDepartmentById,
    deleteDepartment,
    updateDepartment

}

export default DepartmentService