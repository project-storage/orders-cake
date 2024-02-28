import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import { Logout, Money, Settings, Person } from "@mui/icons-material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useProSidebar } from "react-pro-sidebar";
import { useState } from "react";
import { PROFILE_SUPERADMIN_PATH, SYSTEM_NAME } from "../../config/constants";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();
  // useProSidebar hook to control the sidebar
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(PROFILE_SUPERADMIN_PATH)
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          color="inherit"
        >
          <MenuIcon />
        </IconButton> 
        {!collapseSidebar ? (
          <Box sx={{ ml: "20px", fontSize: "20px" }}>{SYSTEM_NAME}</Box>
        ) : (
          <Box sx={{ ml: "16px", fontSize: "16px" }}>{SYSTEM_NAME}</Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          size="large"
          aria-controls="menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenuOpen}
        >
          <MoreVertOutlinedIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile} sx={{ px: "30px" }}>
            <Person sx={{ fontSize: "16px", mr: "20px" }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ px: "30px" }}>
            <Logout sx={{ fontSize: "16px", mr: "20px" }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  appBar: {
    bgcolor: "#0d47a1",
  },
  appLogo: {
    borderRadius: 2,
    width: 40,
    marginLeft: 2,
    cursor: "pointer",
  },
};

export default AppHeader;
