import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import CardSuperAdmin from './card/CardSuperAdmin'
import ChartSuperAdmin from './chart/ChartSuperAdmin'
import CakeSuperAdmin from './Table/cake/CakeSuperAdmin'
import OrderSuperAdmin from './Table/order/OrderSuperAdmin'
import CakeCard from './card/CakeCard'

const Dashboard = () => {
    return (
        <Box className="dashboard-admin">
            <Box sx={{ p: 2 }}>
                <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Dashboard</Typography>
                <Typography >Super-Admin / <span style={{ color: '#2196f3' }}>Dashboard</span></Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
                <CardSuperAdmin />
            </Box>
            <Box sx={{ mt: 3 }}>
                <Grid container >
                    <Grid item xs={12} sm={12} md={12} lg={8} xl={8} sx={{ p: 1 }}>
                        <ChartSuperAdmin />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ p: 1 }} >
                        <CakeCard />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ height: '500px', mt: 3 }}>
                <OrderSuperAdmin />
            </Box>
        </Box>
    )
}

export default Dashboard