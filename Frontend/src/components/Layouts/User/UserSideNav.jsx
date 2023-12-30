import { Avatar, Box, Typography } from "@mui/material";
import {
  Menu,
  MenuItem,
  Sidebar,
  useProSidebar,
} from "react-pro-sidebar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import { Link } from "react-router-dom";
import {
  DASHBOARD_USER,
  FOOTTER,
  PRODUCT_USER,
  REPORT_USER,
} from "../../../config/constants";
import { useState } from "react";
import Footter from "../Footter";

const UserSideNav = () => {
  // useProSidebar hook to control the sidebar
  const { collapsed, toggleSidebar } = useProSidebar();

  // Local state for active menu item
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  // method for handle click on menu item
  const handleMenuClick = (menu) => {
    setActiveMenuItem(menu);
    toggleSidebar();
  };

  return (
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      breakPoint="md"
      backgroundColor={"white"}
    >
      <Box sx={styles.avatarContainer}>
        {/* <Avatar sx={styles.avatar} alt="Masoud" src="/assets/samit.jpg" /> */}
        {!collapsed ? (
          <Typography variant="body2" sx={styles.yourChannel}>
            Samit Koyom
          </Typography>
        ) : null}
        {!collapsed ? (
          <Typography variant="body2">Administrator</Typography>
        ) : null}
      </Box>

      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active ? "#EEEEEE" : "transparent",
            };
          },
        }}
      >
        <MenuItem
          active={activeMenuItem === DASHBOARD_USER}
          component={<Link to={DASHBOARD_USER} />}
          icon={<DashboardOutlinedIcon />}
          onClick={() => handleMenuClick(DASHBOARD_USER)}
        >
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem
          active={activeMenuItem === PRODUCT_USER}
          component={<Link to={PRODUCT_USER} />}
          icon={<SourceOutlinedIcon />}
          onClick={() => handleMenuClick(PRODUCT_USER)}
        >
          <Typography variant="body2">Product </Typography>
        </MenuItem>
        <MenuItem
          active={activeMenuItem === REPORT_USER}
          component={<Link to={REPORT_USER} />}
          icon={<AnalyticsOutlinedIcon />}
          onClick={() => handleMenuClick(REPORT_USER)}
        >
          <Typography variant="body2">Report </Typography>
        </MenuItem>
      </Menu>
      {/* <Footter/> */}
      {!collapsed ? (
        <Box
          textAlign="center"
          sx={{ display: "flex", m: 0.5, p: 0.5, mt: "32rem", width: "100%" }}
        >
          <Typography fontSize="1rem">&#169; {FOOTTER}</Typography>
        </Box>
      ) : null}
    </Sidebar>
  );
};

const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  avatar: {
    width: "40%",
    height: "auto",
  },
  yourChannel: {
    mt: 1,
  },
};
export default UserSideNav;
