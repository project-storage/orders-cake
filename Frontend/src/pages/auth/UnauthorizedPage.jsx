import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        p: 2
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        ไม่ได้รับอนุญาต
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGoHome}
        sx={{ mt: 2 }}
      >
        กลับไปหน้าหลัก
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;