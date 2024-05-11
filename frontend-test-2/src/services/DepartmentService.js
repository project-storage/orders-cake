import http from './http-common'

const create = (departmentData) => {
    return http.post(`/api/departments/create`, departmentData)
}

const getAll = () => {
    return http.get(`/api/departments/all`)
}

const getById = (id) => {
    return http.get(`/api/departments/info/${id}`).then((response) => {
        return response;
    });
}

const deleteById = (id) => {
    return http.delete(`/api/departments/delete/${id.toString()}`)
}

const updateById = (id, updateDepartment) => {
    return http.put(`/api/departments/update/${id}`, updateDepartment)
}

const DepartmentService = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
}

export default DepartmentService