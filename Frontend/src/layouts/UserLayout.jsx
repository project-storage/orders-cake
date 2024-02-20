import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "../components/AppHearder";
import UserSideNav from "../components/Layouts/User/UserSideNav";

const UserLayout = () => {
  return (
    <>
      <CssBaseline />
      <AppHeader />
      <Box sx={styles.container}>
        <UserSideNav />
        <Box component={"main"} sx={styles.mainSection}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
  },
  mainSection: {
    px: 4,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
};

export default UserLayout;
