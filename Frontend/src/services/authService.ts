import http from "./http-common";

// Define interfaces for login and user data
interface LoginData {
  username: string;
  email: string;
  password: string;
}

interface UserData {
  title: string;
  name: string;
  surname: string;
  tel: string;
  email: string;
  username: string;
  password: string;
}

const Login = (loginData: LoginData) => {
  return http.post("/api/auth/login", loginData);
};

const Register = (userData: UserData) => {
  return http.post("/api/auth/register", userData);
};

const authService = {
  Login,
  Register,
};

export default authService;
