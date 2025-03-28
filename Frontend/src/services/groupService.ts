import http from './http-common';

interface DepartmentData {
    roomName: string;
    teachID: number;
    departID: number;
    degreeID: number;
}

interface GroupInfo {
    id: number;
    roomName: string;
    teachID: number;
    departID: number;
    degreeID: number;
    createdAt: string;
    updatedAt: string;
}

const getGroupInfo = async (): Promise<GroupInfo> => {
    const token = localStorage.getItem("token");
    if (token) {
        http.defaults.headers.common["Authorization"] = token;
    }

    const response = await http.get<GroupInfo>("/api/groups/info");
    return response.data.data;
};

const create = async (departmentData: DepartmentData): Promise<GroupInfo> => {
    const response = await http.post<GroupInfo>(`/api/groups/create`, departmentData);
    return response.data.data;
};

const getAll = async (): Promise<GroupInfo[]> => {
    const response = await http.get<GroupInfo[]>(`/api/groups/all`);
    return response.data.data;
};

const getById = async (id: number): Promise<GroupInfo> => {
    const response = await http.get<GroupInfo>(`/api/groups/info/${id}`);
    return response.data.data;
};

const updateById = async (id: number, updateData: DepartmentData): Promise<GroupInfo> => {
    const response = await http.put<GroupInfo>(`/api/groups/update/${id}`, updateData);
    return response.data.data;
};

const deleteById = async (id: number): Promise<void> => {
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
