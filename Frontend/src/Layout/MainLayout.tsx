import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import SideNav from "../components/layouts/SideNav";

const MainLayout = () => {
  return (
    <>
      <CssBaseline>
        <Header />
        <Box sx={styles.container}>
          <SideNav />
          <Box component={"main"} sx={styles.mainSection}>
            <Outlet />
          </Box>
        </Box>
      </CssBaseline>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  mainSection: {
    px: 4,
    width: "100%",
    height: "100%",
      // backgroundColor: "#e9e9e9",
  },
};

export default MainLayout;
