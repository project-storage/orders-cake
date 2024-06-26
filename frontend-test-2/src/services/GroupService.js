import http from './http-common'

const getGroupInfo = () => {
    const token = localStorage.getItem("token");
    http.defaults.headers.common["Authorization"] = token;

    return http.get("/api/groups/info");
};

const create = (departmentData) => {
    return http.post(`/api/groups/create`, departmentData)
}

const getAll = () => {
    return http.get(`/api/groups/all`)
}

const getById = (id) => {
    return http.get(`/api/groups/info/${id}`).then((response) => {
        return response;
    });
}

const updateById = (id, updateData) => {
    return http.put(`/api/groups/update/${id.toString()}`, updateData)
}

const deleteById = (id) => {
    return http.delete(`/api/groups/delete/${id}`)
}

const GroupService = {
    create,
    getGroupInfo,
    getAll,
    getById,
    updateById,
    deleteById
}

export default GroupService