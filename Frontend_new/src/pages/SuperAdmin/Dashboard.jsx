import { Box } from "@mui/material";
import DashboardCard from "../../components/layouts/SuperAdmin/DashboardCard"; // import Component การ์ด
import Chart from "../../components/layouts/SuperAdmin/Chart"; // import Component กราฟ


const Dashboard = () => {
  return (
    <Box >
      <Box>
        <h1>Dashboard</h1>
      </Box>
      <DashboardCard/>
      <Chart/>
    </Box>
  );
};

export default Dashboard;