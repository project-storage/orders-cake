import { Box } from "@mui/material";
import DashboardCard from "../../components/layouts/SuperAdmin/DashboardCard"; // import Component การ์ด
import Chart from "../../components/layouts/SuperAdmin/Chart"; // import Component กราฟ
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserService from "../../services/UserService";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect (() => {
    const token = localStorage.getItem("token");
  
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
  
  return (
    <Box>
      <Box>
        <h1>Dashboard</h1>
      </Box>
      <DashboardCard />
      <Chart />
    </Box>
  );
};

export default Dashboard;
