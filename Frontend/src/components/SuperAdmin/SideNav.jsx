import { Avatar, Box, IconButton, Typography } from "@mui/material";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ADMIN_PATH,
  DASHBOARD_PATH,
  DEPARTMENT_PATH,
  DEPART_CAKE_PATH,
  DEPART_FINANECE_PATH,
  DEPART_PRODUCT_CAKE_PATH,
  PRODUCT_PATH,
  SINGLE_PATH,
  TEACHER_PATH,
  TEAM_PATH,
} from "../../config/constants";
import Footter from "../Footter";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
const SideNav = () => {
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
      <Box sx={styles.yourChannel}>
        {!collapsed ? <Typography variant="h6">Samit Koyom</Typography> : null}
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
          active={activeMenuItem === DASHBOARD_PATH}
          component={<Link to={DASHBOARD_PATH} />}
          icon={<HomeOutlinedIcon />}
          onClick={() => handleMenuClick(DASHBOARD_PATH)}
        >
          <Typography variant="body2">หน้าแรก</Typography>
        </MenuItem>
        {/* order */}
        <SubMenu label="ออร์เดอร์" icon={<StorageOutlinedIcon />}>
          <MenuItem
            active={activeMenuItem === TEAM_PATH}
            component={<Link to={TEAM_PATH} />}
            onClick={() => handleMenuClick(TEAM_PATH)}
            icon={<Groups2OutlinedIcon />}
          >
            <Typography variant="body2">กลุ่มเรียน</Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === SINGLE_PATH}
            component={<Link to={SINGLE_PATH} />}
            onClick={() => handleMenuClick(SINGLE_PATH)}
            icon={<ClassOutlinedIcon />}
          >
            <Typography variant="body2">ระดับชั้น </Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === TEAM_PATH}
            component={<Link to={TEAM_PATH} />}
            onClick={() => handleMenuClick(TEAM_PATH)}
            icon={<SettingsOutlinedIcon />}
          >
            <Typography variant="body2">แผนก</Typography>
          </MenuItem>
        </SubMenu>

        <SubMenu label="การแข่งขัน" icon={<EmojiEventsOutlinedIcon />}>
          <MenuItem
            active={activeMenuItem === TEAM_PATH}
            component={<Link to={TEAM_PATH} />}
            onClick={() => handleMenuClick(TEAM_PATH)}
            icon={<PeopleOutlinedIcon />}
          >
            <Typography variant="body2">ประเภททีม </Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === SINGLE_PATH}
            component={<Link to={SINGLE_PATH} />}
            onClick={() => handleMenuClick(SINGLE_PATH)}
            icon={<Groups2OutlinedIcon />}
          >
            <Typography variant="body2">ประเภทเดี่ยว</Typography>
          </MenuItem>
        </SubMenu>
        {/* cake */}
        <MenuItem
          active={activeMenuItem === PRODUCT_PATH}
          component={<Link to={PRODUCT_PATH} />}
          icon={<CakeOutlinedIcon />}
          onClick={() => handleMenuClick(PRODUCT_PATH)}
        >
          <Typography variant="body2">ข้อมูลเค้ก</Typography>
        </MenuItem>
        {/* student */}
        <SubMenu label="ผู้ใช้งาน" icon={<SupervisedUserCircleOutlinedIcon />}>
          <MenuItem
            active={activeMenuItem === DEPARTMENT_PATH}
            component={<Link to={DEPARTMENT_PATH} />}
            onClick={() => handleMenuClick(DEPARTMENT_PATH)}
            icon={<PeopleOutlinedIcon />}
          >
            <Typography variant="body2"> นักเรียน/นักศึกษา </Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === TEACHER_PATH}
            component={<Link to={TEACHER_PATH} />}
            onClick={() => handleMenuClick(TEACHER_PATH)}
            icon={<PeopleOutlinedIcon />}
          >
            <Typography variant="body2"> ครู/อาจารย์ </Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === DEPART_FINANECE_PATH}
            component={<Link to={DEPART_FINANECE_PATH} />}
            onClick={() => handleMenuClick(DEPART_FINANECE_PATH)}
            icon={<PeopleOutlinedIcon />}
          >
            <Typography variant="body2">ฝ่ายการเงิน</Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === DEPART_CAKE_PATH}
            component={<Link to={DEPART_CAKE_PATH} />}
            onClick={() => handleMenuClick(DEPART_CAKE_PATH)}
            icon={<PeopleOutlinedIcon />}
          >
            <Typography variant="body2">ฝ่ายจ่ายเค้ก</Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === DEPART_PRODUCT_CAKE_PATH}
            component={<Link to={DEPART_PRODUCT_CAKE_PATH} />}
            onClick={() => handleMenuClick(DEPART_PRODUCT_CAKE_PATH)}
            icon={<PeopleOutlinedIcon />}
          >
            <Typography variant="body2">ฝ่ายผลิตเค้ก</Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === ADMIN_PATH}
            component={<Link to={ADMIN_PATH} />}
            onClick={() => handleMenuClick(ADMIN_PATH)}
            icon={<PeopleOutlinedIcon />}
          >
            <Typography variant="body2"> ผู้ดูแลระบบ </Typography>
          </MenuItem>
        </SubMenu>

        <SubMenu label="กลุ่มเรียน" icon={<StorageOutlinedIcon />}>
          <MenuItem
            active={activeMenuItem === TEAM_PATH}
            component={<Link to={TEAM_PATH} />}
            onClick={() => handleMenuClick(TEAM_PATH)}
            icon={<Groups2OutlinedIcon />}
          >
            <Typography variant="body2">กลุ่มเรียน</Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === SINGLE_PATH}
            component={<Link to={SINGLE_PATH} />}
            onClick={() => handleMenuClick(SINGLE_PATH)}
            icon={<ClassOutlinedIcon />}
          >
            <Typography variant="body2">ระดับชั้น </Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === TEAM_PATH}
            component={<Link to={TEAM_PATH} />}
            onClick={() => handleMenuClick(TEAM_PATH)}
            icon={<SettingsOutlinedIcon />}
          >
            <Typography variant="body2">แผนก</Typography>
          </MenuItem>
        </SubMenu>
      </Menu>
      {/* <Footter/> */}
      {!collapsed ? (
        <Box sx={{ mt: 15 }}>
          <Footter />
        </Box>
      ) : null}
    </Sidebar>
  );
};

const styles = {
  yourChannel: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 3,
  },
};

export default SideNav;
