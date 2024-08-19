import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Default options
const defaultOptions: AxiosRequestConfig = {
  baseURL: "http://localhost:4000/", // Ensure this is correct
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
const instance: AxiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Handle errors globally here
    // For example: console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
