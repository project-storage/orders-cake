import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CakeIcon from "@mui/icons-material/Cake";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useState } from "react";
import {
  ADMIN_PATH,
  DASHBOARD_PATH,
  DEPARTMENTSTU_PATH,
  FINANECE_PATH,
  PRODUCT_PATH,
  SINGLE_PATH,
  TEACHER_PATH,
  TEAM_PATH,
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
                    <Typography>SuperAdmin</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              <MenuItem
                active={activeMenuItem === DASHBOARD_PATH}
                component={<Link to={DASHBOARD_PATH} />}
                icon={<HomeOutlinedIcon />}
                onClick={() => handleMenuClick(DASHBOARD_PATH)}
              >
                <Typography variant="body2">Dashboard</Typography>
              </MenuItem>

              {/* <Link to="/superadmin/dashboard" className="menu-bars">
                <MenuItem
                  active={activeMenuItem === "Dashboard"}
                  icon={<HomeOutlinedIcon />}
                >
                  Dashboard
                </MenuItem>
              </Link> */}
              <MenuItem
                active={activeMenuItem === PRODUCT_PATH}
                component={<Link to={PRODUCT_PATH} />}
                icon={<CakeIcon />}
                onClick={() => handleMenuClick(PRODUCT_PATH)}
              >
                <Typography variant="body2">จัดการเค้ก</Typography>
              </MenuItem>

              {/* <Link to="/superadmin/products" className="menu-bars">
                <MenuItem
                  active={activeMenuItem === "Products"}
                  icon={<CakeIcon />}
                >
                  จัดการเค้ก
                </MenuItem>
              </Link> */}
              <SubMenu label="บุคคล" icon={<PeopleOutlinedIcon />}>
                <MenuItem
                  active={activeMenuItem === DEPARTMENTSTU_PATH}
                  component={<Link to={DEPARTMENTSTU_PATH} />}
                  onClick={() => handleMenuClick(DEPARTMENTSTU_PATH)}
                >
                  <Typography variant="body2"> นักเรียน นักศึกษา </Typography>
                </MenuItem>
                {/* <Link to={"/superadmin/departmentstu"} className="menu-bars">
                  <MenuItem active={activeMenuItem === "Departmentstu"}>
                    นักเรียน นักศึกษา
                  </MenuItem>
                </Link> */}

                <MenuItem
                  active={activeMenuItem === TEACHER_PATH}
                  component={<Link to={TEACHER_PATH} />}
                  onClick={() => handleMenuClick(TEACHER_PATH)}
                >
                  <Typography variant="body2"> ครู อาจารย์ </Typography>
                </MenuItem>
                {/* <Link to={"/superadmin/teachers"} className="menu-bars">
                  <MenuItem active={activeMenuItem === "Teachers"}>
                    ครู อาจารย์
                  </MenuItem>
                </Link> */}

                <MenuItem
                  active={activeMenuItem === ADMIN_PATH}
                  component={<Link to={ADMIN_PATH} />}
                  onClick={() => handleMenuClick(ADMIN_PATH)}
                >
                  <Typography variant="body2"> ผู้ดูแลระบบ </Typography>
                </MenuItem>
                {/* <Link to={"/superadmin/admins"} className="menu-bars">
                  <MenuItem active={activeMenuItem === "Admins"}>
                    ผู้ดูแลระบบ
                  </MenuItem>
                </Link> */}

                <MenuItem
                  active={activeMenuItem === FINANECE_PATH}
                  component={<Link to={FINANECE_PATH} />}
                  onClick={() => handleMenuClick(FINANECE_PATH)}
                >
                  <Typography variant="body2">ฝ่ายการเงิน</Typography>
                </MenuItem>
                {/* <Link to={"/superadmin/finances"} className="menu-bars">
                  <MenuItem active={activeMenuItem === "Finances"}>
                    ฝ่ายการเงิน
                  </MenuItem>
                </Link> */}
              </SubMenu>
              <SubMenu label="การแข่งขัน" icon={<EmojiEventsIcon />}>
                <MenuItem
                  active={activeMenuItem === TEAM_PATH}
                  component={<Link to={TEAM_PATH} />}
                  onClick={() => handleMenuClick(TEAM_PATH)}
                >
                  <Typography variant="body2">เดี่ยว</Typography>
                </MenuItem>
                {/* <Link to={"/superadmin/singles"} className="menu-bars">
                  <MenuItem active={activeMenuItem === "Singles"}>
                    เดี่ยว
                  </MenuItem>
                </Link> */}

                <MenuItem
                  active={activeMenuItem === SINGLE_PATH}
                  component={<Link to={SINGLE_PATH} />}
                  onClick={() => handleMenuClick(SINGLE_PATH)}
                >
                  <Typography variant="body2">ทีม </Typography>
                </MenuItem>
                {/* <Link to={"/superadmin/teams"} className="menu-bars">
                  <MenuItem active={activeMenuItem === "Teams"}>ทีม</MenuItem>
                </Link> */}
              </SubMenu>
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
