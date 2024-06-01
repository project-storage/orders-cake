import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Logout, Person } from "@mui/icons-material"
import { useProSidebar } from "react-pro-sidebar"
import { useState } from "react"
import { SYSTEM_NAME } from "../../configs/constrants"
import { useNavigate } from "react-router-dom"

const Header = () => {
    // useProSidebar hook to control the sidebar
    const { collapseSidebar, toggleSidebar, broken } = useProSidebar()
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        navigate('/')
        localStorage.removeItem('token')
    };

    return (
        <AppBar position="sticky" sx={styles.appBar}>
            <Toolbar>
                <IconButton onClick={() => broken ? toggleSidebar() : collapseSidebar()}
                    color="secondary">
                    <MenuIcon />
                </IconButton>
                {!collapseSidebar ? (
                    <Box sx={{ ml: "20px", fontSize: "15px" }}>{SYSTEM_NAME}</Box>
                ) : (
                    <Box sx={{ ml: "16px", fontSize: "20px" }}>{SYSTEM_NAME}</Box>
                )}
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                    size="large"
                    aria-controls="menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMenuOpen}
                >
                    <Avatar src="/assets/samit.jpg" alt="Avatar" sx={{ width: 28, height: 28 }} />
                </IconButton>
                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose} sx={{ px: '30px' }}>
                        <Person sx={{ fontSize: '16px', mr: '20px' }} /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ px: '30px' }}>
                        <Logout sx={{ fontSize: '16px', mr: '20px' }} /> Logout
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    )
}

const styles = {
    appBar: {
        bgcolor: 'teal'
    },
    appLogo: {
        borderRadius: 2,
        width: 40,
        marginLeft: 2,
        cursor: 'pointer'
    }
}

export default Header