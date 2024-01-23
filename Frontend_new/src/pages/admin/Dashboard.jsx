import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Card, Grid, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const data = [
  {
    name: "Page A",
    "จำนวนเค้ก": 2400,
  },
  {
    name: "Page B",
    "จำนวนเค้ก": 1398,
  },
  {
    name: "Page C",
    "จำนวนเค้ก": 9800,
  },
  {
    name: "Page D",
    "จำนวนเค้ก": 3908,
  },
  {
    name: "Page E",
    "จำนวนเค้ก": 4800,
  },
  {
    name: "Page F",
    "จำนวนเค้ก": 3800,
  },
  {
    name: "Page G",
    "จำนวนเค้ก": 4300,
  },
  {
    name: "Page G",
    "จำนวนเค้ก": 4300,
  },
  {
    name: "Page G",
    "จำนวนเค้ก": 4300,
  },
  {
    name: "Page G",
    "จำนวนเค้ก": 4300,
  },
  {
    name: "Page G",
    "จำนวนเค้ก": 4300,
  },
  {
    name: "Page G",
    "จำนวนเค้ก": 4300,
  },
  {
    name: "Page G",
    "จำนวนเค้ก": 4500,
  },
];
const card = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  p: 1,
  m: 1,
  height: 100,
};
const Dashboard = () => {
  return (
    <>
      <Box>
        <h1>Dashboard</h1>
      </Box>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "space-around", p: 1, m: 1 }}
        columns={{ xs: 3, sm: 12, md: 12 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={card}>
            <Box
              sx={{
                borderRadius: "50%",
                background: "#F08383",
                border: 0,
                width: "3rem",
                height: "3rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 1.5,
                }}
              >
                <HomeOutlinedIcon sx={{ fontSize: 25, color: "#BD3D3D" }} />
              </Box>
            </Box>
            <Box sx={{ p: 0, m: 0 }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                จำนวนผู้ใช้งาน
              </Typography>
              <Typography sx={{ fontSize: 25 }}>200</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={card}>
            <Box
              sx={{
                borderRadius: "50%",
                background: "#F08383",
                border: 0,
                width: "3rem",
                height: "3rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 1.5,
                }}
              >
                <HomeOutlinedIcon sx={{ fontSize: 25, color: "#BD3D3D" }} />
              </Box>
            </Box>
            <Box sx={{ p: 0, m: 0 }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                จำนวนผู้ใช้งาน
              </Typography>
              <Typography sx={{ fontSize: 25 }}>200</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={card}>
            <Box
              sx={{
                borderRadius: "50%",
                background: "#F08383",
                border: 0,
                width: "3rem",
                height: "3rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 1.5,
                }}
              >
                <HomeOutlinedIcon sx={{ fontSize: 25, color: "#BD3D3D" }} />
              </Box>
            </Box>
            <Box sx={{ p: 0, m: 0 }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                จำนวนผู้ใช้งาน
              </Typography>
              <Typography sx={{ fontSize: 25 }}>200</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={card}>
            <Box
              sx={{
                borderRadius: "50%",
                background: "#F08383",
                border: 0,
                width: "3rem",
                height: "3rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 1.5,
                }}
              >
                <HomeOutlinedIcon sx={{ fontSize: 25, color: "#BD3D3D" }} />
              </Box>
            </Box>
            <Box sx={{ p: 0, m: 0 }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                จำนวนผู้ใช้งาน
              </Typography>
              <Typography sx={{ fontSize: 25 }}>200</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      
        <Box sx={{ display: "flex", justifyContent: "center"}}>
          <Typography sx={{ fontSize: 25, mt: 3 }}>
            จำนวนยอดการสั่งซื้อแต่ละแผนก
          </Typography>
        </Box>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "250px",
            marginTop: 20,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              height: 350,
              maxWidth: "100%"
            }}
          >
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="จำนวนเค้ก" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

    </>
  );
};

export default Dashboard;
