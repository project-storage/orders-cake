import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import DashboardCard from '../analytics/superAdmin/DashboardCard';
import DashboardChart from '../analytics/superAdmin/DashboardChart';
import TopSellingCakes from '../analytics/superAdmin/TopSellingCakes';
import PerformanceMetrics from '../analytics/superAdmin/PerformanceMetrics';
import RecentOrdersTable from './../analytics/superAdmin/RecentOrdersTable';

const Dashboard = () => {
  return (
    <Box sx={{
      flexGrow: 1,
      padding: 3,
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard
            title="ยอดขายรวม"
            value="150,000 ฿"
            change="+12.5%"
            icon="revenue"
            color="#42a5f5"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard
            title="คำสั่งซื้อใหม่"
            value="42"
            change="+8.2%"
            icon="orders"
            color="#66bb6a"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard
            title="เค้กทั้งหมด"
            value="24"
            change="+3.1%"
            icon="cakes"
            color="#ffca28"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard
            title="ผู้ใช้งานทั้งหมด"
            value="128"
            change="+5.7%"
            icon="users"
            color="#ab47bc"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} sx={{
            p: 2,
            height: '100%',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <DashboardChart />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={3} sx={{
            p: 2,
            height: '100%',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <RecentOrdersTable />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{
            p: 2,
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <TopSellingCakes />
          </Paper>
        </Grid>
      </Grid>

      <PerformanceMetrics />
    </Box>
  );
};

export default Dashboard;