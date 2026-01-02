import http from './http-common';

const getGroupInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        http.defaults.headers.common["Authorization"] = token;
    }

    const response = await http.get("/api/groups/info");
    return response.data.data;
};

const create = async (departmentData) => {
    const response = await http.post(`/api/groups/create`, departmentData);
    return response.data.data;
};

const getAll = async () => {
    const response = await http.get(`/api/groups/all`);
    return response.data.data;
};

const getById = async (id) => {
    const response = await http.get(`/api/groups/info/${id}`);
    return response.data.data;
};

const updateById = async (id, updateData) => {
    const response = await http.put(`/api/groups/update/${id}`, updateData);
    return response.data.data;
};

const deleteById = async (id) => {
    await http.delete(`/api/groups/delete/${id}`);
};

const GroupService = {
    create,
    getGroupInfo,
    getAll,
    getById,
    updateById,
    deleteById,
};

export default GroupService;
