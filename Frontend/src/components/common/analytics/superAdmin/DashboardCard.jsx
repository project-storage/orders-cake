import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Avatar
} from '@mui/material';
import { 
  Store as RevenueIcon, 
  ShoppingCart as OrdersIcon, 
  Cake as CakesIcon, 
  People as UsersIcon 
} from '@mui/icons-material';

const DashboardCard = ({ title, value, change, icon, color }) => {
  const getIcon = () => {
    switch(icon) {
      case 'revenue':
        return <RevenueIcon sx={{ fontSize: 40, color: color }} />;
      case 'orders':
        return <OrdersIcon sx={{ fontSize: 40, color: color }} />;
      case 'cakes':
        return <CakesIcon sx={{ fontSize: 40, color: color }} />;
      case 'users':
        return <UsersIcon sx={{ fontSize: 40, color: color }} />;
      default:
        return <RevenueIcon sx={{ fontSize: 40, color: color }} />;
    }
  };

  const getChangeColor = () => {
    return change.startsWith('+') ? '#4caf50' : '#f44336';
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
        },
        border: '1px solid #f0f0f0'
      }}
    >
      <CardContent sx={{ p: 2, flex: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 1
        }}>
          <Avatar
            sx={{ 
              width: 56, 
              height: 56, 
              backgroundColor: `${color}20`,
              color: color,
              mb: 1
            }}
          >
            {getIcon()}
          </Avatar>
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666', 
            fontSize: '0.85rem',
            mb: 0.5
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#333',
            mb: 1
          }}
        >
          {value}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: getChangeColor(), 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {change} จากเดือนที่แล้ว
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;