import http from "./http-common";

const Login = (loginData) => {
  return http.post("/api/auth/login", loginData);
};

const Register = (userData) => {
  return http.post("/api/auth/register", userData);
};

const authService = {
  Login,
  Register,
};

export default authService;
