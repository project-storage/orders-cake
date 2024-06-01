import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layouts/Footer'
import SideNav from '../components/layouts/teacher/SideNav'
import Header from '../components/layouts/Header'

const TeacherLayout = () => {
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

export default TeacherLayout