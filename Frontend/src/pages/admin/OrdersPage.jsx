import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AdminOrdersPage = () => {
  // Sample data for orders
  const orders = [
    { id: 'ORD001', customer: 'สมชาย ใจดี', cake: 'เค้กช็อกโกแลต', date: '2023-05-15', status: 'completed', amount: 1200 },
    { id: 'ORD002', customer: 'สมหญิง สวยใส', cake: 'เค้กสตรอว์เบอร์รี่', date: '2023-05-16', status: 'confirmed', amount: 950 },
    { id: 'ORD003', customer: 'วิชัย รวยมาก', cake: 'เค้กเนยถั่ว', date: '2023-05-17', status: 'pending', amount: 1500 },
    { id: 'ORD004', customer: 'จิราภรณ์ สว่างใจ', cake: 'เค้กผลไม้รวม', date: '2023-05-18', status: 'in-progress', amount: 1100 },
    { id: 'ORD005', customer: 'ธนากร ยิ้มแย้ม', cake: 'เค้กชิฟฟ่อน', date: '2023-05-19', status: 'cancelled', amount: 800 },
  ];

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA726'; // Orange
      case 'confirmed': return '#42A5F5'; // Blue
      case 'in-progress': return '#FFB74D'; // Light Orange
      case 'completed': return '#66BB6A'; // Green
      case 'cancelled': return '#EF5350'; // Red
      default: return '#9E9E9E'; // Grey
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        จัดการคำสั่งซื้อ
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>รหัสคำสั่งซื้อ</TableCell>
              <TableCell>ลูกค้า</TableCell>
              <TableCell>เค้ก</TableCell>
              <TableCell>วันที่สั่ง</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>จำนวนเงิน</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.cake}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'inline-block', 
                      px: 1, 
                      py: 0.5, 
                      borderRadius: 1, 
                      bgcolor: getStatusColor(order.status),
                      color: 'white',
                      fontSize: '0.8rem'
                    }}
                  >
                    {order.status === 'pending' && 'รอดำเนินการ'}
                    {order.status === 'confirmed' && 'ยืนยันแล้ว'}
                    {order.status === 'in-progress' && 'กำลังดำเนินการ'}
                    {order.status === 'completed' && 'เสร็จสิ้น'}
                    {order.status === 'cancelled' && 'ยกเลิก'}
                  </Box>
                </TableCell>
                <TableCell>{order.amount.toLocaleString()} บาท</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminOrdersPage;