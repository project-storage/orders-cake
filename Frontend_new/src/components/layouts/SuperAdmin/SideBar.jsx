
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
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import TableViewIcon from '@mui/icons-material/TableView';
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
                    <Typography>Admin</Typography>
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

              <Link to="/superadmin/dashboard" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
              </Link>
              <Link to="/superadmin/products" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>จัดการเค้ก</MenuItem>
              </Link>

              {/* <SubMenu icon={<MapOutlinedIcon />} label="Data">
                <Link to={"/admin/viewtable"} className="menu-bars">
                  <MenuItem icon={<TableViewIcon />}>
                    {" "}
                    Table 
                  </MenuItem>
                </Link>
                <MenuItem icon={<BarChartOutlinedIcon />}>
                  {" "}
                  Line charts
                </MenuItem>
              </SubMenu> */}

              <SubMenu label="บุคคล" icon={<PeopleOutlinedIcon />}>
                <Link to={"/superadmin/departmentstu"} className="menu-bars">
                  <MenuItem>นักเรียน นักศึกษา</MenuItem>
                </Link>
                <Link to={"/superadmin/teachers"} className="menu-bars">
                  <MenuItem>ครู อาจารย์</MenuItem>
                </Link>
                <Link to={"/superadmin/admins"} className="menu-bars">
                  <MenuItem>ผู้ดูแลระบบ</MenuItem>
                </Link>
                <Link to={"/superadmin/finances"} className="menu-bars">
                  <MenuItem>ฝ่ายการเงิน</MenuItem>
                </Link>
                {/* <Link to={"/admin/admin"} className="menu-bars">
                  <MenuItem>ผู้ดูแล ระบบ</MenuItem>
                </Link> */}
                {/* <MenuItem> Admin</MenuItem> */}
              </SubMenu>
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