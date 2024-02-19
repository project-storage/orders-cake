import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logout } from "@mui/icons-material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

const HeaderBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigete = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigete("/");
  };

  const handleProfile = () => {
    navigete("/profile")
  };
  return (
    <Box display="flex" justifyContent="end" p={2}>
      <Box display="flex">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ManageAccountsOutlinedIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default HeaderBar;
