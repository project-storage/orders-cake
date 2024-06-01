import { Avatar, Box, Typography } from "@mui/material"
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from "react-pro-sidebar"
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined'
import { Link } from "react-router-dom"
import { ALL_USER_PATH, CAKE_PATH, DASHBOARD_PATH, DEGREE_PATH, DEPARTMENT_PATH, GROUP_PATH, ORDER_PATH } from "../../../configs/constrants"
import { useEffect, useState } from "react"
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import UserService from '../../../services/UserService'
const SideNav = () => {
    const [userInfo, setUserInfo] = useState([])

    const fetchData = async () => {
        try {
            const res = await UserService.getUserInfo()
            setUserInfo(res.data.data)
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    // useProSidebar hook to control the sidebar
    const { collapsed, toggleSidebar } = useProSidebar()

    // Local state for active menu item
    const [activeMenuItem, setActiveMenuItem] = useState('Dashboard')

    // method for handle click on menu item
    const handleMenuClick = (menu) => {
        setActiveMenuItem(menu)
        toggleSidebar()
    }

    return (
        <Sidebar
            style={{ height: "116vh", top: 'auto' }}
            breakPoint="md"
            backgroundColor={'white'}
        >
            <Box sx={styles.avatarContainer}>
                <Avatar alt="Masoud" src="/assets/samit.jpg" />
                {!collapsed ? <Typography variant="body2" sx={styles.yourChannel}>{userInfo.title}{userInfo.name} {userInfo.surname}</Typography> : null}
                {!collapsed ? <Typography variant="body2">สถานะ {userInfo.role}</Typography> : null}
            </Box>

            <Menu
                menuItemStyles={{
                    button: ({ active }) => {
                        return {
                            backgroundColor: active ? '#e0e0e0' : 'transparent',
                        }
                    }
                }}
            >
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
                    onClick={() => handleMenuClick(ORDER_PATH)}>
                    <Typography variant="body2">ออร์เดอร์ </Typography>
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
                    // onClick={() => handleMenuClick(GROUP_PATH)}
                    icon={<Groups2OutlinedIcon />}
                >
                    <Typography variant="body2">ห้องเรียน </Typography>
                </MenuItem>
            </Menu >
        </Sidebar >
    )
}

const styles = {
    avatarContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'column',
        my: 5
    },
    yourChannel: {
        mt: 1
    }
}

export default SideNav