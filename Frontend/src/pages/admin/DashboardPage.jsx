import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingCart as OrderIcon,
  Cake as CakeIcon,
  Group as GroupIcon
} from '@mui/icons-material';

const DashboardPage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        แดชบอร์ดผู้ดูแลระบบ
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6">ผู้ใช้งานทั้งหมด</Typography>
              <Typography variant="h4">120</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <OrderIcon sx={{ fontSize: 40, mr: 2, color: 'secondary.main' }} />
            <Box>
              <Typography variant="h6">คำสั่งซื้อทั้งหมด</Typography>
              <Typography variant="h4">85</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <CakeIcon sx={{ fontSize: 40, mr: 2, color: 'success.main' }} />
            <Box>
              <Typography variant="h6">เค้กทั้งหมด</Typography>
              <Typography variant="h4">45</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <GroupIcon sx={{ fontSize: 40, mr: 2, color: 'warning.main' }} />
            <Box>
              <Typography variant="h6">กลุ่มเรียน</Typography>
              <Typography variant="h4">12</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              คำสั่งซื้อล่าสุด
            </Typography>
            <Typography>แสดงรายการคำสั่งซื้อล่าสุดของผู้ใช้งาน</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              สรุปข้อมูล
            </Typography>
            <Typography>แสดงข้อมูลสรุปภาพรวมของระบบ</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;