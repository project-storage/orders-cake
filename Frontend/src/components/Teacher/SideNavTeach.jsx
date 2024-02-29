import { Avatar, Box, IconButton, Typography } from "@mui/material";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ADMIN_PATH,
  DASHBOARDTEACH_PATH,
  DASHBOARD_PATH,
  DEGREE_PATH,
  DEPARTMENT_PATH,
  DEPART_CAKE_PATH,
  DEPART_FINANECE_PATH,
  DEPART_PRODUCT_CAKE_PATH,
  GROUP_TEACHER_PATH,
  PRODUCT_PATH,
  SINGLE_PATH,
  STUDENT_TEACHER_PATH,
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
import TeacherService from "../../services/TeacherService";

const SideNavTeach = () => {
  const [name, setName] = useState([]);
  // useProSidebar hook to control the sidebar
  const { collapsed, toggleSidebar } = useProSidebar();

  // Local state for active menu item
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  // method for handle click on menu item
  const handleMenuClick = (menu) => {
    setActiveMenuItem(menu);
    toggleSidebar();
  };

  const fetchData = async () => {
    const res = await TeacherService.getTeacherInfo();
    setName(res.data.data);
    try {
    } catch (error) {
      console.error("Error Fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      breakPoint="md"
      backgroundColor={"white"}
    >
      <Box sx={styles.yourChannel}>
        {!collapsed ? (
          <Box>
            <Typography variant="h6">
             {name.title}{name.name} {name.surname}
            </Typography>
          </Box>
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
          active={activeMenuItem === DASHBOARDTEACH_PATH}
          component={<Link to={DASHBOARDTEACH_PATH} />}
          icon={<HomeOutlinedIcon />}
          onClick={() => handleMenuClick(DASHBOARDTEACH_PATH)}
        >
          <Typography variant="body2">หน้าแรก</Typography>
        </MenuItem>
        <SubMenu label="ผู้ใช้งาน" icon={<SupervisedUserCircleOutlinedIcon />}>
          <MenuItem
            active={activeMenuItem === STUDENT_TEACHER_PATH}
            component={<Link to={STUDENT_TEACHER_PATH} />}
            onClick={() => handleMenuClick(STUDENT_TEACHER_PATH)}
            icon={<PeopleOutlinedIcon />}
          >
            <Typography variant="body2"> นักเรียน/นักศึกษา </Typography>
          </MenuItem>

          <MenuItem
            active={activeMenuItem === GROUP_TEACHER_PATH}
            component={<Link to={GROUP_TEACHER_PATH} />}
            onClick={() => handleMenuClick(GROUP_TEACHER_PATH)}
            icon={<ClassOutlinedIcon />}
          >
            <Typography variant="body2">ห้องเรียน </Typography>
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

export default SideNavTeach;
