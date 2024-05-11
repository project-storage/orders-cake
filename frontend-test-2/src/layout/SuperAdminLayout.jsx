import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layouts/Footer'
import SideNav from '../components/layouts/super-admin/SideNav'
import Header from '../components/layouts/super-admin/Header'

const SuperAdminLayout = () => {
    return (
        <>
            <CssBaseline>
                <Header />
                <Box sx={styles.container}>
                    <SideNav />
                    <Box
                        component={"main"}
                        sx={styles.mainSection}
                    >
                        <Outlet />
                    </Box>
                </Box>
                <Footer />
            </CssBaseline>
        </>
    )
}

const styles = {
    container: {
        display: "flex",
        bgcolor: "neutral.light",
    },
    mainSection: {
        px: 4,
        width: "100%",
        height: "100%",
        overflow: "auto",
    },
};

export default SuperAdminLayout