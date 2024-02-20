import { Box } from "@mui/material";
import Card from "../../components/SuperAdmin/Card";
import React from "react";
import Chart from "../../components/SuperAdmin/Chart";

const DashboardSuper = () => {
  return (
    <Box>
      <h1>Dashboard</h1>
      <Chart />
      <Card />
    </Box>
  );
};

export default DashboardSuper;
