import { Button,MenuItem } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NVC from "../../assets/nvc.png";
import {  ImageList } from "@mui/material";
import styled from "@emotion/styled";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

const Responsive = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  // color: purple[500],
}));

const currencies = [
  {
    value: "นาย",
    label: "นาย",
  },
  {
    value: "นางสาว",
    label: "นางสาว",
  },
  {
    value: "นาง",
    label: "นาง",
  },
];

const Register = () => {
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       codeStudent: data.get("codeStudent"),
  //       password: data.get("password"),
  //     });
  //   };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container">
      <Responsive>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box>
            <ImageList
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={NVC} loading="lazy" width={150} height={150} />
            </ImageList>
            <Typography component="h1" variant="h5" align="center">
              สมัครสมาชิก
            </Typography>
            <Typography component="h1" variant="h5" align="center">
              ระบบสั่งจองเค้กออนไลน์
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="คำนำหน้า"
                  fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="ชื่อ"
                  multiline
                  maxRows={4}
                  fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="นามสกุล"
                  multiline
                  maxRows={4}
                  fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="เบอร์โทร"
                  multiline
                  maxRows={4}
                  fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="อีเมล"
                  multiline
                  maxRows={4}
                  fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="ชื่อผู้ใช้งาน"
                  multiline
                  maxRows={4}
                  fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl variant="outlined" maxRows={4}
                  fullWidth >
                  <InputLabel htmlFor="outlined-adornment-password">
                    รหัสผ่าน
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl variant="outlined" maxRows={4}
                  fullWidth >
                  <InputLabel htmlFor="outlined-adornment-password">
                    ยืนยันรหัสผ่าน
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                สมัครสมาชิก
              </Button>
          </Box>
        </Container>
      </Responsive>
    </div>
  );
};

export default Register;
