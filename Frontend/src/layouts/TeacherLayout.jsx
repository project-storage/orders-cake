import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SideNavTeach from "../components/Teacher/SideNavTeach";
import AppHearderTeach from "../components/Teacher/AppHearderTeach";

const TeacherLayout = () => {
  return (
    <>
      <CssBaseline />
      <AppHearderTeach />
      <Box sx={styles.container}>
        <SideNavTeach />
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

export default TeacherLayout;
