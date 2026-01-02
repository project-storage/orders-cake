import React from 'react';
import { Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';

const AdminUserInfoPage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        จัดการข้อมูลผู้ใช้งาน
      </Typography>
      
      <Paper sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ชื่อ"
              defaultValue="สมชาย"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="นามสกุล"
              defaultValue="ใจดี"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="อีเมล"
              defaultValue="somchai@example.com"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="เบอร์โทรศัพท์"
              defaultValue="0812345678"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ชื่อผู้ใช้งาน"
              defaultValue="somchai"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="บทบาท"
              defaultValue="นักเรียน"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              บันทึกข้อมูล
            </Button>
            <Button variant="outlined" color="secondary">
              ยกเลิก
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          ผู้ใช้งานทั้งหมด
        </Typography>
        <Typography>แสดงรายการผู้ใช้งานทั้งหมดในระบบ</Typography>
      </Paper>
    </Box>
  );
};

export default AdminUserInfoPage;