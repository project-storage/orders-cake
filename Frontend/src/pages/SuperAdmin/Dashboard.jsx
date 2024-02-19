import DashboardSuperAdmin from "components/Dashboard/SuperAdmin/DashboardSuperAdmin";
import React from "react";

const Dashboard = () => {
  return (
    <Box>
      <Box>
        <h1>Dashboard</h1>
      </Box>
      <DashboardSuperAdmin />
      <ChartS />
    </Box>
  );
};

export default Dashboard;
