import React from 'react';
import { Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';

const StudentUserInfoPage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ข้อมูลส่วนตัวของฉัน
      </Typography>
      
      <Paper sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="คำนำหน้าชื่อ"
              defaultValue="นาย"
              variant="outlined"
              margin="normal"
            />
          </Grid>
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
              label="ชั้น"
              defaultValue="ม.6/1"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="กลุ่มเรียน"
              defaultValue="กลุ่มที่ 1"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              อัปเดตข้อมูล
            </Button>
            <Button variant="outlined" color="secondary">
              เปลี่ยนรหัสผ่าน
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default StudentUserInfoPage;