import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Swal from 'sweetalert2'
import AuthService from '../../../../../services/AuthService'

const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tel, setTel] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [createdUser, setCreatedUser] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const create = await AuthService.Register({
        title,
        name,
        surname,
        tel,
        role,
        email,
        username,
        password,
      });

      if (create.status === 201) {
        setCreatedUser(true);
        setOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "สร้างข้อมูลสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (createdUser) {
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    }
  }, [createdUser])

  return (
    <Box className="form-create-user">
      <Button variant="contained" onClick={handleClickOpen}>
        สร้างข้อมูล
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>สร้างข้อมูลผู้ใช้งาน</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item md={4} xs={12}>
                <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
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
                  variant="standard"
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
                  variant="standard"
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
                  variant="standard"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
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
                  variant="standard"
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
                  variant="standard"
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
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color='error'>ยกเลิก</Button>
              <Button type="submit" color='success' variant="contained">ยืนยัน</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default CreateUser
