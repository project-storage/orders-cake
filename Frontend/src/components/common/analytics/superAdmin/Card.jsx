import { Box, Card, CardContent, Grid, Typography, Icon } from '@mui/material';
import React from 'react';
import {
  Cake as CakeIcon,
  People as UsersIcon,
  ShoppingCart as OrdersIcon,
  Store as RevenueIcon
} from '@mui/icons-material';

const DashboardCard = () => {
  const stats = [
    {
      title: 'ยอดขายรวม',
      value: '150,000 ฿',
      icon: <RevenueIcon sx={{ fontSize: 40, color: '#42a5f5' }} />,
      color: '#e3f2fd',
      change: '+12.5%'
    },
    {
      title: 'คำสั่งซื้อใหม่',
      value: '42',
      icon: <OrdersIcon sx={{ fontSize: 40, color: '#66bb6a' }} />,
      color: '#e8f5e9',
      change: '+8.2%'
    },
    {
      title: 'เค้กทั้งหมด',
      value: '24',
      icon: <CakeIcon sx={{ fontSize: 40, color: '#ffca28' }} />,
      color: '#fff8e1',
      change: '+3.1%'
    },
    {
      title: 'ผู้ใช้งานทั้งหมด',
      value: '128',
      icon: <UsersIcon sx={{ fontSize: 40, color: '#ab47bc' }} />,
      color: '#f3e5f5',
      change: '+5.7%'
    }
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{ padding: 2 }}
    >
      {stats.map((stat, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Card
            sx={{
              bgcolor: stat.color,
              boxShadow: 3,
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-5px)',
              },
              transition: 'all 0.3s ease-in-out',
              padding: 2
            }}
          >
            <CardContent sx={{ textAlign: 'center', flex: 1 }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 1
              }}>
                {stat.icon}
              </Box>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 1
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#666',
                  mb: 1,
                  fontSize: '1rem'
                }}
              >
                {stat.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#4caf50',
                  fontWeight: 'bold'
                }}
              >
                {stat.change} จากเดือนที่แล้ว
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCard;
