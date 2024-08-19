import { Avatar, Box, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { Link } from "react-router-dom";
import {
  CAKE_PATH,
  DASHBOARD_PATH,
  GROUP_PATH,
  ORDER_PATH,
} from "../../configs/constants";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../slices/userSlice";
import { RootState } from "../../store/store";

const SideNav = () => {
  const { collapsed, toggleSidebar } = useProSidebar();
  const [activeMenuItem, setActiveMenuItem] = useState<string>("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const userRole = user ? user.role : "";

  const handleMenuClick = (menu: string) => {
    setActiveMenuItem(menu);
    toggleSidebar();
  };

  return (
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      breakPoint="md"
      backgroundColor={"white"}
    >
      <Box sx={styles.avatarContainer}>
        <Avatar sx={styles.avatar} alt="Masoud" src="/assets/samit.jpg" />
        {!collapsed ? (
          <Typography variant="body2" sx={styles.yourChannel}>
            {user?.title}
            {user?.name} {user?.surname}
          </Typography>
        ) : null}
        {!collapsed ? (
          <Typography
            variant="body2"
            sx={{
              bgcolor: "primary.main",
              borderRadius: "25px",
              p: 1,
            }}
          >
            สถานะ: {user?.role}
          </Typography>
        ) : null}
      </Box>

      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            backgroundColor: active ? "#EEEEEE" : "transparent",
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
              <Typography variant="body2">หน้าแรก</Typography>
            </MenuItem>
            <MenuItem
              active={activeMenuItem === ORDER_PATH}
              component={<Link to={ORDER_PATH} />}
              icon={<SourceOutlinedIcon />}
              onClick={() => handleMenuClick(ORDER_PATH)}
            >
              <Typography variant="body2">ออร์เดอร์</Typography>
            </MenuItem>
            <MenuItem
              active={activeMenuItem === CAKE_PATH}
              component={<Link to={CAKE_PATH} />}
              icon={<CakeOutlinedIcon />}
              onClick={() => handleMenuClick(CAKE_PATH)}
            >
              <Typography variant="body2">นักเรียน/นักศึกษา</Typography>
            </MenuItem>
            <MenuItem
              active={activeMenuItem === GROUP_PATH}
              component={<Link to={GROUP_PATH} />}
              icon={<Groups2OutlinedIcon />}
              onClick={() => handleMenuClick(GROUP_PATH)}
            >
              <Typography variant="body2">ห้องเรียน</Typography>
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
            <Typography variant="body2">นักเรียน/นักศึกษา</Typography>
          </MenuItem>
        )}
      </Menu>
    </Sidebar>
  );
};

const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  avatar: {
    width: "40%",
    height: "auto",
  },
  yourChannel: {
    mt: 1,
  },
};

export default SideNav;
