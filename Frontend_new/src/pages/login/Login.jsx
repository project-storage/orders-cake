// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NVC from "../../assets/nvc.png";
import { ImageList } from "@mui/material";
// import { useEffect, useState } from "react";
import styled from "@emotion/styled";
// import { green } from "@mui/material/colors";
// import { green, purple, red } from "@mui/material/colors";

// import { createTheme, ThemeProvider } from "@mui/material/styles";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme({
//   typography: {
//     fontFamily: [
//       'Prompt',
//       'sans-serif'
//     ].join(',')
//   }
// });

// const Responsive = styled("div")(({ theme }) => ({
//   [theme.breakpoints.up(0)]: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "90vh",
//     // color: green[500],
//   },
//   [theme.breakpoints.up(768)]: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "90vh",
//     // color: green[500],
//   },
//   [theme.breakpoints.up(1024)]: {
//     marginTop: 8,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "90vh",
//     // color: red[500],
//   },
//   [theme.breakpoints.up(1200)]: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "90vh",
//     // color: purple[500],
//   },
// }));

const Responsive = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    // color: purple[500],
}));
const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      codeStudent: data.get("codeStudent"),
      password: data.get("password"),
    });
  };

  // const [w, setW] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setW(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    // <ThemeProvider theme={defaultTheme}>
    <div className="container">
      <Responsive>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box>
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar> */}
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
            {/* <Typography align="center">{w}</Typography> */}
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
                label="รหัสนักศึกษา"
                name="codeStudent"
                autoComplete="codeStudent"
                autoFocus
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
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                เข้าสู่ระบบ
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ลืมรหัสผ่าน?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"ไม่มีบัญชีใช่หรือไม่? สมัครสมาชิก"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </Responsive>
    </div>
    // </ThemeProvider>
  );
};

export default Login;
