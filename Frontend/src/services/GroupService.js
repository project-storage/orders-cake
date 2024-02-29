import http from './http-common'

const getGroupInfo = () => {
    const token = localStorage.getItem("token");
    http.defaults.headers.common["Authorization"] = token;

    return http.get("/api/groups/info");
};

const createGroup = (departmentData) => {
    return http.post(`/api/groups/create`, departmentData)
}

const getAllGroup = () => {
    return http.get(`/api/groups/all`)
}

const deleteGroup = (id) => {
    return http.delete(`/api/groups/delete/${id}`)
}

const updateGroup = (id, updateData) => {
    return http.post(`/api/groups/update/${id.toString()}`, updateData)
}

const GroupService = {
    createGroup,
    getGroupInfo,
    getAllGroup,
    updateGroup,
    deleteGroup

}

export default GroupService