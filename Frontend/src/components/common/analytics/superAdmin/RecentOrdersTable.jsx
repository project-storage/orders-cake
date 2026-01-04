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
  Chip,
  Box
} from '@mui/material';

const RecentOrdersTable = () => {
  const orders = [
    { id: '#001', customer: 'สมชาย ใจดี', cake: 'เค้กช็อกโกแลต', date: '04 Jan 2026', amount: '1,200 ฿', status: 'เสร็จสิ้น' },
    { id: '#002', customer: 'สมหญิง สวยใส', cake: 'เค้กครีมสด', date: '03 Jan 2026', amount: '950 ฿', status: 'กำลังดำเนินการ' },
    { id: '#003', customer: 'สมศักดิ์ พุ่งแรง', cake: 'เค้กวานิลา', date: '03 Jan 2026', amount: '1,500 ฿', status: 'เสร็จสิ้น' },
    { id: '#004', customer: 'สมหมาย รวยเงิน', cake: 'เค้กผลไม้', date: '02 Jan 2026', amount: '1,800 ฿', status: 'รอชำระเงิน' },
    { id: '#005', customer: 'สมปอง ขยันทำ', cake: 'เค้กช็อกโกแลต', date: '01 Jan 2026', amount: '1,100 ฿', status: 'เสร็จสิ้น' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'เสร็จสิ้น':
        return '#4caf50';
      case 'กำลังดำเนินการ':
        return '#ff9800';
      case 'รอชำระเงิน':
        return '#2196f3';
      default:
        return '#bdbdbd';
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
        คำสั่งซื้อล่าสุด
      </Typography>
      <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>รหัสคำสั่งซื้อ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ลูกค้า</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>จำนวนเงิน</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>สถานะ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f9f9f9' }
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {order.id}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {order.cake}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{order.customer}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {order.date}
                  </Typography>
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      backgroundColor: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status),
                      fontWeight: 'bold',
                      border: `1px solid ${getStatusColor(order.status)}40`
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecentOrdersTable;