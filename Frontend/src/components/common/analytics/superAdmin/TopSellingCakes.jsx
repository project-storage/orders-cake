import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';

const TopSellingCakes = () => {
  const cakes = [
    { name: 'เค้กช็อกโกแลต', sales: 120, percentage: 35, status: 'best' },
    { name: 'เค้กครีมสด', sales: 85, percentage: 25, status: 'good' },
    { name: 'เค้กวานิลา', sales: 68, percentage: 20, status: 'good' },
    { name: 'เค้กผลไม้', sales: 51, percentage: 15, status: 'average' },
    { name: 'เค้กชีส', sales: 17, percentage: 5, status: 'low' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'best':
        return '#4caf50';
      case 'good':
        return '#8bc34a';
      case 'average':
        return '#ffeb3b';
      case 'low':
        return '#f44336';
      default:
        return '#bdbdbd';
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
        เค้กขายดี
      </Typography>
      <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>ชื่อเค้ก</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">จำนวนขาย</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">สัดส่วน</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">สถานะ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cakes.map((cake, index) => (
              <TableRow 
                key={index} 
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f9f9f9' }
                }}
              >
                <TableCell component="th" scope="row">
                  {cake.name}
                </TableCell>
                <TableCell align="center">{cake.sales}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ minWidth: 100, mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={cake.percentage} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getStatusColor(cake.status)
                          }
                        }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">{`${cake.percentage}%`}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={cake.status === 'best' ? 'ขายดีมาก' : 
                          cake.status === 'good' ? 'ขายดี' : 
                          cake.status === 'average' ? 'ขายปานกลาง' : 'ขายต่ำ'}
                    size="small" 
                    sx={{ 
                      backgroundColor: getStatusColor(cake.status),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopSellingCakes;