import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  ImageList,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LOGIN_PATH } from "../../config/constants";
import NVC from "../../assets/nvc.png";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";

const Register = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, setCreateUser] = useState({});
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqData = {
        title: title,
        name: name,
        surname: surname,
        telephone: telephone,
        role: role,
        email: email,
        username: username,
        password: password,
      };

      const response = await UserService.createUser(reqData);

      if (response.status === 200) {
        Swal.fire("เพิ่มผู้ใช้งานสำเร็จ", "", "success");
        console.log(response.data.data);
        setCreateUser(response.data.data);
        setUserId(response.data.data);
        navigate(LOGIN_PATH);
      } else {
        Swal.fire("กรุณากรอกข้อมูลให้ครบ", "", "info");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setRole(value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          <ImageList
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={NVC} loading="lazy" width={100} height={100} />
          </ImageList>
          <Typography component="h1" variant="h5">
            สมัครการใช้งาน
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    คำนำหน้า
                  </InputLabel>
                  <Select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="คำนำหน้า"
                  >
                    <MenuItem value="" disabled>
                      --------------คำนำหน้า--------------
                    </MenuItem>
                    <MenuItem value="นาย">นาย</MenuItem>
                    <MenuItem value="นาง">นาง</MenuItem>
                    <MenuItem value="นางสาว">นางสาว</MenuItem>
                    <MenuItem value="น.ส.">น.ส.</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ชื่อจริง"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="นามสกุล"
                  name="lastName"
                  autoComplete="family-name"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telephone"
                  label="เบอร์โทรศัพท์"
                  name="telephone"
                  autoComplete="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="ชื่อผู้ใช้งาน"
                  type="username"
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    สถานะผู้ใช้งาน
                  </InputLabel>
                  <Select
                    value={role}
                    onChange={handleChange}
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="สถานะผู้ใช้งาน"
                  >
                    <MenuItem value="" disabled>
                      --------------สถานะผู้ใช้งาน--------------
                    </MenuItem>
                    <MenuItem value="Admin">ผู้ดูระบบ</MenuItem>
                    <MenuItem value="ครูที่ปรึกษา">ครูที่ปรึกษา</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              สมัครการใช้งาน
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
