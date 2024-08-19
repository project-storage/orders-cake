import http from "./http-common";

interface UserData {
  title: string;
  name: string;
  surname: string;
  tel: string;
  email: string;
  username: string;
  password: string;
}

interface UserResponse {
  data: UserData; // Adjust based on the actual structure of the response data
}

interface UsersResponse {
  data: UserData[]; // Array of user data
}

// Function to get user info with authorization
const getUserInfo = async (): Promise<UserResponse> => {
  const token = localStorage.getItem("token");
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return http.get<UserResponse>("/api/users/info");
};

// Function to get user by ID
const getUserById = (id: string): Promise<UserResponse> => {
  return http.get<UserResponse>(`/api/users/search?id=${id}`);
};

// Function to get users with role "ครูที่ปรึกษา"
const getUseTeacher = (): Promise<UsersResponse> => {
  return http.get<UsersResponse>(`/api/users/search?role=ครูที่ปรึกษา`);
};

// Function to get all users
const getAllUser = (): Promise<UsersResponse> => {
  return http.get<UsersResponse>(`/api/users/all`);
};

// Function to search admin users
const getSearchAdmin = (): Promise<UsersResponse> => {
  return http.get<UsersResponse>(`/api/users/search?role=admin`);
};

// Function to update a user
const updateUser = (id: string, updateUser: UserData): Promise<UserResponse> => {
  return http.put<UserResponse>(`/api/users/update/${id}`, updateUser);
};

// Function to delete a user
const deleteUser = (id: string): Promise<void> => {
  return http.delete(`/api/users/delete/${id}`);
};

const userService = {
  getUserInfo,
  getUserById,
  getUseTeacher,
  getSearchAdmin,
  getAllUser,
  updateUser,
  deleteUser,
};

export default userService;
