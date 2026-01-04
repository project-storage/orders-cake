import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Grid,
  Avatar
} from '@mui/material';
import { 
  ShoppingCart, 
  People, 
  LocalShipping,
  AttachMoney
} from '@mui/icons-material';

const PerformanceMetrics = () => {
  const metrics = [
    { 
      title: 'อัตราการแปลงคำสั่งซื้อ', 
      value: '85%', 
      progress: 85, 
      color: '#4caf50',
      icon: <ShoppingCart />
    },
    { 
      title: 'ความพึงพอใจของลูกค้า', 
      value: '92%', 
      progress: 92, 
      color: '#2196f3',
      icon: <People />
    },
    { 
      title: 'การจัดส่งตรงเวลา', 
      value: '96%', 
      progress: 96, 
      color: '#ff9800',
      icon: <LocalShipping />
    },
    { 
      title: 'กำไรต่อเค้ก', 
      value: '45%', 
      progress: 45, 
      color: '#9c27b0',
      icon: <AttachMoney />
    }
  ];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        mt: 3
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
        ตัวชี้วัดประสิทธิภาพ
      </Typography>
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar
                sx={{ 
                  width: 50, 
                  height: 50, 
                  backgroundColor: `${metric.color}20`,
                  color: metric.color,
                  mb: 1,
                  mx: 'auto'
                }}
              >
                {metric.icon}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                {metric.value}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
                {metric.title}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={metric.progress} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: metric.color
                    }
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PerformanceMetrics;