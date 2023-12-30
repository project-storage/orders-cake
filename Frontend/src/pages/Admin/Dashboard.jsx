import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
      navigate("/loading");
    } else {
      UserService.getUserInfo()
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);
  return <div>Dashboard</div>;
};

export default Dashboard;
