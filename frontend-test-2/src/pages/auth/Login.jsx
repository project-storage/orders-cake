import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NVC from "../../assets/nvc.png";
import { ImageList } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  // DASHBOARDTEACH_PATH,
  DASHBOARD_PATH,
  // REGISTER_PATH,
} from "../../configs/constrants";
import AuthService from "../../services/AuthService";
import Swal from 'sweetalert2'

const Login = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // เพิ่มตัวแปร loading
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // กำหนด loading เป็น true เมื่อกดปุ่มเข้าสู่ระบบ

    try {
      const res = await AuthService.Login(formData);
      const userRole = res.data.data.role;
      localStorage.setItem("token", res.data.data.token);

      switch (userRole) {
        case "superAdmin":
          navigate(DASHBOARD_PATH);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ยินดีต้อนรับเข้าสู่ระบบ!",
            text: `คุณ ${formData.login}`,
            showConfirmButton: false,
            timer: 1500
          });
          break;
        // case "Admin":
        // case "DeparCake":
        // case "DepartMoney":
        //   navigate("/user/dashboard");
        //   Swal.fire("ยินดีต้อนรับเข้าสู่ระบบ", `${formData.login}`, "success");
        //   break;
        // case "ครูที่ปรึกษา":
        //   navigate(DASHBOARDTEACH_PATH);
        //   Swal.fire("ยินดีต้อนรับเข้าสู่ระบบ", `${formData.login}`, "success");
        //   break;
        default:
          // Handle other roles or unknown roles
          break;
      }
    } catch (error) {
      console.error("Login failed", error);
      // Show error message with toast
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "โปรดใส่ username หรือ email และ password ให้ถูกต้อง",
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setLoading(false); // กำหนด loading เป็น false เมื่อสิ้นสุดการส่งคำขอ
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
              <img src={NVC} loading="lazy" width={150} height={150} />
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
                id="codeStudent"
                label="ชื่อผู้ใช้งาน"
                name="codeStudent"
                autoComplete="codeStudent"
                autoFocus
                value={formData.login}
                onChange={(e) =>
                  setFormData({ ...formData, login: e.target.value })
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading} // กำหนด disabled ตามค่าของ loading
              >

                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}{" "}
                {/* เปลี่ยนข้อความของปุ่มให้ตรงกับสถานะของ loading */}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                  // href={REGISTER_PATH}
                  >
                    โปรดสมัครการใช้งานเพื่อเข้าสู่ระบบ
                  </Link>
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
  // color: purple[500],
}));

export default Login;
