import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.username === "" || formData.password === "") {
      console.log("Error: Form fields are empty");
      return;
    }

    try {
      const response = await UserService.postLogin(formData);
      const userRole = response.data.role;

      switch (userRole) {
        case "superAdmin":
          localStorage.setItem("token", response.data.token);
          navigate("/backend/dashboard");
          break;
        case "Admin":
        case "DeparCake":
        case "DepartMoney":
          localStorage.setItem("token", response.data.token);
          navigate("/user/dashboard");
          break;
        case "student":
          localStorage.setItem("token", response.data.token);
          navigate("/student/dashboard");
          break;
        case "teacher":
          localStorage.setItem("token", response.data.token);
          navigate("/teacher/dashboard");
          break;
        default:
          // Handle other roles or unknown roles
          break;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>

        <div>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
