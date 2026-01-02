import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingCart as OrderIcon,
  Cake as CakeIcon,
  Event as EventIcon
} from '@mui/icons-material';

const StudentDashboardPage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        แดชบอร์ดนักเรียน
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6">ข้อมูลส่วนตัว</Typography>
              <Typography variant="h4">1</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <OrderIcon sx={{ fontSize: 40, mr: 2, color: 'secondary.main' }} />
            <Box>
              <Typography variant="h6">คำสั่งซื้อของฉัน</Typography>
              <Typography variant="h4">5</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <CakeIcon sx={{ fontSize: 40, mr: 2, color: 'success.main' }} />
            <Box>
              <Typography variant="h6">เค้กที่สั่ง</Typography>
              <Typography variant="h4">3</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <EventIcon sx={{ fontSize: 40, mr: 2, color: 'warning.main' }} />
            <Box>
              <Typography variant="h6">กิจกรรม</Typography>
              <Typography variant="h4">2</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              คำสั่งซื้อล่าสุดของฉัน
            </Typography>
            <Typography>แสดงรายการคำสั่งซื้อที่คุณได้สั่งไปล่าสุด</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ข้อมูลส่วนตัว
              </Typography>
              <Typography>ชื่อ-นามสกุล: นักเรียน ตัวอย่าง</Typography>
              <Typography>ชั้น: ม.6/1</Typography>
              <Typography>กลุ่มเรียน: กลุ่มที่ 1</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboardPage;