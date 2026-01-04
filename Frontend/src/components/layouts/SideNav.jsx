import React, { useState, useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import {
  DashboardOutlined as DashboardIcon,
  SourceOutlined as SourceIcon,
  Groups2Outlined as GroupsIcon,
  CakeOutlined as CakeIcon,
  SupervisedUserCircleOutlined as UsersIcon,
  ClassOutlined as ClassIcon,
  StorageOutlined as StorageIcon,
  SettingsOutlined as SettingsIcon,
  Person as PersonIcon,
  ExitToAppOutlined as LogoutIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {
  CAKE_PATH,
  DASHBOARD_PATH,
  GROUP_PATH,
  ORDER_PATH,
  ALL_USER_PATH,
  DEGREE_PATH,
  DEPARTMENT_PATH,
  DASHBOARD_TEACHERPATH,
  USERINFO_PATH,
  GROUP_TEACHERPATH,
} from "../../configs/constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../slices/userSlice";
import SidebarFooter from "./SidebarFooter";
import Swal from "sweetalert2";

const SideNav = () => {
  const { toggleSidebar, collapsed } = useProSidebar();

  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await dispatch(getUserInfo()).unwrap();
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        // If user info fails to load, redirect to login
        navigate("/");
      }
    };

    fetchUserInfo();
  }, [dispatch, navigate]);

  const userRole = user?.role || "";

  const handleMenuClick = (menu) => {
    setActiveMenuItem(menu);
    toggleSidebar();
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "แน่ใจแล้วหรอที่จะออกจากระบบ",
      showCancelButton: true,
      confirmButtonText: "กดเพื่อออกจากระบบ",
      cancelButtonText: "กดยกเลิกยังไม่แน่ใจ",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          icon: "success",
          title: "ออกจากระบบสำเร็จ",
          text: "แล้วเจอกันใหม่สวัสดี",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };

  return (
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      breakPoint="md"
      backgroundColor={"white"}
    >
      <Box sx={styles.avatarContainer}>
        <Avatar sx={styles.avatar} alt={user?.name} src="/assets/samit.jpg" />
        {!collapsed && (
          <>
            <Typography variant="subtitle1" sx={styles.userName}>
              {user?.title}
              {user?.name} {user?.surname}
            </Typography>
            <Box sx={styles.userRoleContainer}>
              <Typography variant="caption" sx={styles.userRoleBadge}>
                สถานะ: {userRole}
              </Typography>
            </Box>
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
        {loading ? (
          <MenuItem disabled>กำลังโหลดข้อมูล...</MenuItem>
        ) : userRole === "superAdmin" ? (
          <>
            <MenuItem
              active={activeMenuItem === DASHBOARD_PATH}
              component={<Link to={DASHBOARD_PATH} />}
              icon={<DashboardIcon />}
              onClick={() => handleMenuClick(DASHBOARD_PATH)}
            >
              {!collapsed && "แดซบอร์ด"}
            </MenuItem>
            {!collapsed && (
              <Typography
                variant="body2"
                fontWeight={600}
                sx={styles.sectionTitle}
              >
                จัดการระบบ
              </Typography>
            )}
            <MenuItem
              active={activeMenuItem === ORDER_PATH}
              component={<Link to={ORDER_PATH} />}
              icon={<SourceIcon />}
              onClick={() => handleMenuClick(ORDER_PATH)}
            >
              {!collapsed && "ออร์เดอร์"}
            </MenuItem>
            <MenuItem
              active={activeMenuItem === CAKE_PATH}
              component={<Link to={CAKE_PATH} />}
              icon={<CakeIcon />}
              onClick={() => handleMenuClick(CAKE_PATH)}
            >
              {!collapsed && "เค้ก"}
            </MenuItem>
            {!collapsed && (
              <Typography
                variant="body2"
                fontWeight={600}
                sx={styles.sectionTitle}
              >
                จัดการข้อมูล
              </Typography>
            )}
            <SubMenu label={!collapsed && "กลุ่มเรียน"} icon={<StorageIcon />}>
              <MenuItem
                active={activeMenuItem === GROUP_PATH}
                component={<Link to={GROUP_PATH} />}
                icon={<GroupsIcon />}
              >
                <Typography variant="body2">กลุ่มเรียน </Typography>
              </MenuItem>

              <MenuItem
                active={activeMenuItem === DEGREE_PATH}
                component={<Link to={DEGREE_PATH} />}
                onClick={() => handleMenuClick(DEGREE_PATH)}
                icon={<ClassIcon />}
              >
                <Typography variant="body2">ระดับชั้น </Typography>
              </MenuItem>

              <MenuItem
                active={activeMenuItem === DEPARTMENT_PATH}
                component={<Link to={DEPARTMENT_PATH} />}
                onClick={() => handleMenuClick(DEPARTMENT_PATH)}
                icon={<SettingsIcon />}
              >
                <Typography variant="body2">แผนก </Typography>
              </MenuItem>
            </SubMenu>
            <MenuItem
              active={activeMenuItem === ALL_USER_PATH}
              component={<Link to={ALL_USER_PATH} />}
              icon={<UsersIcon />}
            >
              {!collapsed && "ผู้ใช้งาน"}
            </MenuItem>
            <MenuItem
              active={activeMenuItem === USERINFO_PATH}
              component={<Link to={USERINFO_PATH} />}
              icon={<PersonIcon />}
            >
              {!collapsed && "ข้อมูลส่วนตัว"}
            </MenuItem>
            {!collapsed && (
              <Typography
                variant="body2"
                fontWeight={600}
                sx={styles.sectionTitle}
              >
                ออกจากระบบ
              </Typography>
            )}
            <MenuItem
              onClick={handleLogout}
              icon={<LogoutIcon />}
              style={styles.logoutColor}
            >
              {!collapsed && "ออกจากระบบ"}
            </MenuItem>
          </>
        ) : userRole === "ครูที่ปรึกษา" ? (
          <>
            <MenuItem
              active={activeMenuItem === DASHBOARD_TEACHERPATH}
              component={<Link to={DASHBOARD_TEACHERPATH} />}
              icon={<DashboardIcon />}
              onClick={() => handleMenuClick(DASHBOARD_TEACHERPATH)}
            >
              {!collapsed && "แดซบอร์ด"}
            </MenuItem>
            <MenuItem
              active={activeMenuItem === ORDER_PATH}
              component={<Link to={ORDER_PATH} />}
              icon={<SourceIcon />}
              onClick={() => handleMenuClick(ORDER_PATH)}
            >
              {!collapsed && "ออร์เดอร์"}
            </MenuItem>
            {!collapsed && (
              <Typography
                variant="body2"
                fontWeight={600}
                sx={styles.sectionTitle}
              >
                จัดการข้อมูล
              </Typography>
            )}
            <MenuItem
              active={activeMenuItem === GROUP_PATH}
              component={<Link to={GROUP_TEACHERPATH} />}
              icon={<GroupsIcon />}
            >
              <Typography variant="body2">กลุ่มเรียน</Typography>
            </MenuItem>
            <MenuItem
              active={activeMenuItem === USERINFO_PATH}
              component={<Link to={USERINFO_PATH} />}
              icon={<PersonIcon />}
            >
              {!collapsed && "ข้อมูลส่วนตัว"}
            </MenuItem>
            {!collapsed && (
              <Typography
                variant="body2"
                fontWeight={600}
                sx={styles.sectionTitle}
              >
                ออกจากระบบ
              </Typography>
            )}
            <MenuItem
              onClick={handleLogout}
              icon={<LogoutIcon />}
              style={styles.logoutColor}
            >
              {!collapsed && "ออกจากระบบ"}
            </MenuItem>
          </>
        ) : (
          <MenuItem disabled>ไม่พบข้อมูลผู้ใช้งาน</MenuItem>
        )}
      </Menu>
      {!collapsed && <SidebarFooter />}
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
    backgroundColor: "#f0f8ff", // Light blue background
    borderBottom: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    border: "3px solid #1976D2", // Blue border around avatar
    marginBottom: 1,
  },
  userName: {
    marginTop: 1,
    fontWeight: "bold",
    fontSize: "1rem",
    textAlign: "center",
    color: "#333",
  },
  userRoleContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: 0.5,
  },
  userRoleBadge: {
    bgcolor: "#1976D2", // Blue background
    borderRadius: "12px",
    padding: "0.3em 0.8em",
    fontSize: "0.75rem",
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  appLogo: {
    width: 40,
    height: 40,
    cursor: "pointer",
    borderRadius: 2,
  },
  sectionTitle: {
    opacity: 0.5,
    letterSpacing: "0.5px",
    paddingLeft: "5%",
    textTransform: "uppercase",
    fontSize: "0.75rem",
    fontWeight: "bold",
    color: "#666",
  },
  logoutColor: {
    color: "#d32f2f", // Darker red
  },
};

export default SideNav;
