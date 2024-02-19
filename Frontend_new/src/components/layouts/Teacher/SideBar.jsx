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
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { ClassOutlined } from "@mui/icons-material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {
  ORDERSTU_TEACHERPATH,
  ROOMSTU_TEACHERPATH,
  ROOM_TEACHERPATH,
} from "../../../config/constants";
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
                    <Typography>Teacher</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              <MenuItem
                active={activeMenuItem === ROOM_TEACHERPATH}
                component={<Link to={ROOM_TEACHERPATH} />}
                icon={<HomeOutlinedIcon />}
                onClick={() => handleMenuClick(ROOM_TEACHERPATH)}
              >
                <Typography variant="body2">
                  ระดับชั้นที่อยู่ในการดูแล
                </Typography>
              </MenuItem>
              {/* 
              <Link to="/teacher/roomstu" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>
                  ระดับชั้นที่อยู่ในการดูแล
                </MenuItem>
              </Link> */}

              <MenuItem
                active={activeMenuItem === ROOMSTU_TEACHERPATH}
                component={<Link to={ROOMSTU_TEACHERPATH} />}
                icon={<ClassOutlined />}
                onClick={() => handleMenuClick(ROOMSTU_TEACHERPATH)}
              >
                <Typography variant="body2">จัดการห้องเรียน</Typography>
              </MenuItem>
              {/* <Link to="/teacher/rooms" className="menu-bars">
                <MenuItem icon={<ClassOutlined />}>จัดการห้องเรียน</MenuItem>
              </Link> */}

              <MenuItem
                active={activeMenuItem === ORDERSTU_TEACHERPATH}
                component={<Link to={ORDERSTU_TEACHERPATH} />}
                icon={<BorderColorOutlinedIcon />}
                onClick={() => handleMenuClick(ORDERSTU_TEACHERPATH)}
              >
                <Typography variant="body2"> ออร์เดอร์นักเรียน</Typography>
              </MenuItem>
              {/* <Link to="/teacher/orders" className="menu-bars">
                <MenuItem icon={<BorderColorOutlinedIcon />}>
                  ออร์เดอร์นักเรียน
                </MenuItem>
              </Link> */}
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
