import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById, updateUser } from '../../../../../slices/userSlice';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { ALL_USER_PATH } from '../../../../../configs/constrants';

const UpdateUser = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tel, setTel] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading, error: fetchError } = useSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      setTitle(user.title);
      setName(user.name);
      setSurname(user.surname);
      setTel(user.tel);
      setRole(user.role);
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(updateUser({
        id,
        title,
        name,
        surname,
        username,
        tel,
        role,
        email,
        password
      }));

      if (res.payload) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "อัพเดทข้อมูลสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      setError("Failed to update user");
    }
  };

  const handleCancelClick = () => {
    navigate(ALL_USER_PATH);
  };

  return (
    <Box className="update-user">
      <form onSubmit={handleSubmit}>
        {fetchError && <Typography color="error">{fetchError}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item md={4} xs={12}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="demo-simple-select-standard-label">คำนำหน้า*</InputLabel>
              <Select
                required
                margin="dense"
                id="title"
                name="title"
                label="คำนำหน้า"
                type="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <MenuItem value="" disabled>
                  --------------เลือกคำนำหน้า--------------
                </MenuItem>
                <MenuItem value="นาย">นาย</MenuItem>
                <MenuItem value="นาง">นาง</MenuItem>
                <MenuItem value="น.ส.">น.ส.</MenuItem>
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="ชื่อ"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              required
              margin="dense"
              id="surname"
              name="surname"
              label="นามสกุล"
              type="text"
              fullWidth
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              margin="dense"
              id="tel"
              name="tel"
              label="เบอร์โทร"
              type="tel"
              fullWidth
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="demo-simple-select-standard-label">บทบาท*</InputLabel>
              <Select
                required
                margin="dense"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="role"
                label="บทบาท"
                type="name"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="" disabled>
                  --------------บทบาท--------------
                </MenuItem>
                <MenuItem value="superAdmin">ผู้จัดการระบบ</MenuItem>
                <MenuItem value="Admin">ผู้ดูระบบ</MenuItem>
                <MenuItem value="ฝ่ายจ่ายเค้ก">ฝ่ายจ่ายเค้ก</MenuItem>
                <MenuItem value="ฝ่ายการเงิน">ฝ่ายการเงิน</MenuItem>
                <MenuItem value="ครูที่ปรึกษา">ครูที่ปรึกษา</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="อีเมล"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              margin="dense"
              id="username"
              name="username"
              label="ชื่อผู้ใช้"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="dense"
              id="password"
              name="password"
              label="รหัสผ่าน"
              type="password"
              fullWidth
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              // sx={{ ml: 2 }}
              color="success"
              variant="contained"
              type="submit"
            >
              อัพเดทข้อมูล
            </Button>
            <Button
              sx={{ ml: 1 }}
              color="error"
              variant="contained"
              onClick={handleCancelClick} // แก้ onClick เป็น handleCancelClick
            >
              ยกเลิก
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default UpdateUser;
