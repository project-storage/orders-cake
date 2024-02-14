
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  // SidebarFooter,
} from "react-pro-sidebar";
import { Box, IconButton, Typography} from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

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
        style={{ height: "100%", border: "none",backgroundColor:"rgb(255, 255, 255)"}}
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
              {/* {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={'../../assets/001.jpg'}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography sx={{ m: "10px 0 0 0" }}>ROITAI</Typography>
                    <Typography>DEV </Typography>
                  </Box>
                </Box>
              )} */}
              <Link to="/teacher/roomstu" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>ออเดอร์นักเรียน </MenuItem>
              </Link>
              <Link to="/teacher/rooms" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>จัดการห้องเรียน</MenuItem>
              </Link>
              {/* <Link to="/superadmin/products" className="menu-bars">
                <MenuItem icon={<CakeIcon />}>จัดการเค้ก</MenuItem>
              </Link> */}
              {/* <SubMenu label="ห้องเรียน" icon={<HomeOutlinedIcon />}>
                <Link to={"#"} className="menu-bars">
                  <MenuItem>ห้องเรียนทั้งหมด</MenuItem>
                </Link>
                <Link to={"#"} className="menu-bars">
                  <MenuItem>จัดการห้องเรียน</MenuItem>
                </Link>
              </SubMenu> */}

              
              
            </Menu>

            {/* <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: isCollapsed ? 0 : 0.5,
                  letterSpacing: "0.5px",
                }}
              >
                Extra
              </Typography>
            </div>

            <Menu>
              {/* <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem> 
              <MenuItem icon={<ReceiptOutlinedIcon />}>ตั้งค่า</MenuItem>
            </Menu> */}
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