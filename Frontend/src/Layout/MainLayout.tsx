import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import SideNav from "../components/layouts/SideNav";

const MainLayout = () => {
  return (
    <>
      <CssBaseline /> {/* Ensure baseline styles are applied */}
      <Box sx={styles.app}>
        <SideNav />
        <Box sx={styles.content}>
          <Header />
          <Box sx={styles.content_body}>
            <Box m="20px">
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const styles = {
  app: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f7fff7",
  },
  content_body: {
    flex: 1,
    backgroundColor: "#e9e9e9",
    overflowY: "auto",
    padding: "20px",
  },
};

export default MainLayout;
