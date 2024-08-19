import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import SideNav from "../components/layouts/SideNav";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box sx={{ display: "flex", flex: 1 }}>
        <SideNav />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            background: "#e9e9e9",
          }}
        >
          <Box sx={{ m: "0px 60px", p: "64px 24px" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
