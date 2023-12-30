import axios from "axios";

const defaultOptoins = {
    baseURL: "http://localhost:4000/",
    headers: {
        "Content-Type": "application/json"
    }
}

// create instanc
let instance = axios.create(defaultOptoins)

// set the auth token for my request
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer${token}` : ""
    return config
})

export default instance