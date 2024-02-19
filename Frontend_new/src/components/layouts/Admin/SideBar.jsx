import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  // SidebarFooter,
} from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CakeIcon from "@mui/icons-material/Cake";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useState } from "react";
import { ORDERALL_ADMINPATH } from "../../../config/constants";
const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div
      style={{
        // display: "flex",
        height: "100%",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        // image="/assets/17372.jpg"
        breakPoint="md"
        style={{
          height: "100%",
          border: "none",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography>Admin</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              <MenuItem
                active={activeMenuItem === ORDERALL_ADMINPATH}
                component={<Link to={ORDERALL_ADMINPATH} />}
                icon={<HomeOutlinedIcon />}
                onClick={() => handleMenuClick(ORDERALL_ADMINPATH)}
              >
                <Typography variant="body2">ออเดอร์ทั้งหมด</Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SideBar;
