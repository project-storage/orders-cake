import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import NVC from "../../../assets/nvc.png";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { DASHBOARD_PATH, DASHBOARD_TEACHERPATH } from "../../../configs/constants";
import { login } from "../../../slices/authSlice";
import { getUserInfo } from "../../../slices/userSlice";

const Login = () => {
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, loading, error } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await dispatch(login(loginData)).unwrap();
      const userRole = res.data.user.role;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);
      // Get user info to populate user state in Redux
      await dispatch(getUserInfo()).unwrap();

      switch (userRole) {
        case "superAdmin":
          navigate(DASHBOARD_PATH);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ยินดีต้อนรับเข้าสู่ระบบ!",
            text: `คุณ ${loginData.login}`,
            showConfirmButton: false,
            timer: 1500,
          });
          break;
        case "ครูที่ปรึกษา":
          navigate(DASHBOARD_TEACHERPATH);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ยินดีต้อนรับเข้าสู่ระบบ!",
            text: `คุณ ${loginData.login}`,
            showConfirmButton: false,
            timer: 1500,
          });
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("Login failed", err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "โปรดใส่ username หรือ email และ password ให้ถูกต้อง",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container">
      <Responsive>
        <Container component="main" maxWidth="xs">
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
              <img
                src={NVC}
                loading="lazy"
                width={150}
                height={150}
                alt="Logo"
              />
            </ImageList>
            <Typography component="h1" variant="h5" align="center">
              ระบบสั่งจองเค้กออนไลน์
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="ชื่อผู้ใช้งาน"
                name="login"
                autoComplete="login"
                autoFocus
                value={loginData.login}
                onChange={(e) =>
                  setLoginData({ ...loginData, login: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#">โปรดสมัครการใช้งานเพื่อเข้าสู่ระบบ</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Responsive>
    </div>
  );
};

const Responsive = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
}));

export default Login;
