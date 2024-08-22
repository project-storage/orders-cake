import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import {
  CAKE_PATH,
  DASHBOARD_PATH,
  GROUP_PATH,
  ORDER_PATH,
  SYSTEM_NAME,
} from "../../configs/constants";
import logo from "../../assets/nvc.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../slices/userSlice";
import { RootState } from "../../store/store";
import SidebarFooter from "./SidebarFooter";

const SideNav = () => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const [activeMenuItem, setActiveMenuItem] = useState<string>("");
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const userRole = user?.role || "";

  const handleMenuClick = (menu: string) => {
    setActiveMenuItem(menu);
  };

  // const handleToggleSidebar = () => {
  //   collapseSidebar();
  // };

  return (
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      breakPoint="md"
      backgroundColor={"white"}
    >
      <Box>
        {!collapsed && (
          <Box sx={styles.headerContainer}>
            <Typography variant="h6" sx={styles.systemName}>
              {SYSTEM_NAME}
            </Typography>
            <Box component={"img"} sx={styles.appLogo} src={logo} />
          </Box>
        )}
        {/* <IconButton onClick={handleToggleSidebar} sx={styles.toggleButton}>
          <MenuOutlinedIcon />
        </IconButton> */}
      </Box>

      <Box sx={styles.avatarContainer}>
        <Avatar sx={styles.avatar} alt={user?.name} src="/assets/samit.jpg" />
        {!collapsed && (
          <>
            <Typography variant="body2" sx={styles.userName}>
              {user?.title}
              {user?.name} {user?.surname}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                bgcolor: "primary.main",
                borderRadius: "25px",
                p: 0.5,
                mt: 1,
                color: "white",
              }}
            >
              สถานะ: {userRole}
            </Typography>
          </>
        )}
      </Box>

      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            backgroundColor: active ? "#1976D2" : "transparent",
            color: active ? "white" : "inherit",
            borderRadius: 5,
            margin: "5px 0",
            padding: "10px 15px",
          }),
        }}
      >
        {userRole === "superAdmin" && (
          <>
            <MenuItem
              active={activeMenuItem === DASHBOARD_PATH}
              component={<Link to={DASHBOARD_PATH} />}
              icon={<DashboardOutlinedIcon />}
              onClick={() => handleMenuClick(DASHBOARD_PATH)}
            >
              {!collapsed && "หน้าแรก"}
            </MenuItem>
            <MenuItem
              active={activeMenuItem === ORDER_PATH}
              component={<Link to={ORDER_PATH} />}
              icon={<SourceOutlinedIcon />}
              onClick={() => handleMenuClick(ORDER_PATH)}
            >
              {!collapsed && "ออร์เดอร์"}
            </MenuItem>
            <MenuItem
              active={activeMenuItem === CAKE_PATH}
              component={<Link to={CAKE_PATH} />}
              icon={<CakeOutlinedIcon />}
              onClick={() => handleMenuClick(CAKE_PATH)}
            >
              {!collapsed && "นักเรียน/นักศึกษา"}
            </MenuItem>
            <MenuItem
              active={activeMenuItem === GROUP_PATH}
              component={<Link to={GROUP_PATH} />}
              icon={<Groups2OutlinedIcon />}
              onClick={() => handleMenuClick(GROUP_PATH)}
            >
              {!collapsed && "ห้องเรียน"}
            </MenuItem>
          </>
        )}

        {userRole === "ครูที่ปรึกษา" && (
          <MenuItem
            active={activeMenuItem === CAKE_PATH}
            component={<Link to={CAKE_PATH} />}
            icon={<CakeOutlinedIcon />}
            onClick={() => handleMenuClick(CAKE_PATH)}
          >
            {!collapsed && "นักเรียน/นักศึกษา"}
          </MenuItem>
        )}
      </Menu>
      <SidebarFooter/>
    </Sidebar>
  );
};

const styles = {
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
    bgcolor: "white",
  },
  toggleButton: {
    color: "primary.main",
  },
  systemName: {
    fontWeight: "bold",
    flexGrow: 1,
    textAlign: "center",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px 10px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
  },
  userName: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: "1rem",
  },
  appLogo: {
    width: 40,
    height: 40,
    cursor: "pointer",
    borderRadius: 2,
  },
};

export default SideNav;
