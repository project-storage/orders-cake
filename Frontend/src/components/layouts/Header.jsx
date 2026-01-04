import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import { Logout, Money, Settings, Person } from "@mui/icons-material";
import { useProSidebar } from "react-pro-sidebar";
import { useState } from "react";
import logo from "../../assets/nvc.png";
import { SYSTEM_NAME } from "../../configs/constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
  };
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Box sx={styles.headerContainer}>
          <Typography variant="h6" sx={styles.systemName}>
            {SYSTEM_NAME}
          </Typography>
          <Box component={"img"} sx={styles.appLogo} src={logo} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton title="Notifications" color="inherit">
            <NotificationsOutlined />
          </IconButton>
          <IconButton title="Language" color="inherit">
            <LanguageOutlined />
          </IconButton>
          <IconButton
            size="large"
            aria-controls="menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ padding: 0.5 }}
          >
            <Avatar
              src="/assets/samit.jpg"
              alt="Avatar"
              sx={{ width: 32, height: 32, border: '2px solid rgba(255,255,255,0.3)' }}
            />
          </IconButton>
        </Box>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} sx={{ px: "30px" }}>
            <Person sx={{ fontSize: "16px", mr: "20px" }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ px: "30px" }}>
            <Settings sx={{ fontSize: "16px", mr: "20px" }} /> Settings
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ px: "30px" }}>
            <Money sx={{ fontSize: "16px", mr: "20px" }} /> Billing
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
    bgcolor: "#1565c0", // Darker blue
    color: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  appLogo: {
    width: 45,
    height: 45,
    cursor: "pointer",
    borderRadius: 3,
    border: "1px solid rgba(255,255,255,0.2)",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 15px",
    flex: 1,
    marginLeft: 1,
  },
  systemName: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    flexGrow: 1,
    textAlign: "center",
    color: "white",
    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
  },
};

export default Header;
