import { Box, Typography,Grid } from "@mui/material";
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

const Chart = () => {
  const cakeData = [
    { name: "Page A", จำนวนเค้ก: 2400 },
    {
      name: "Page B",
      จำนวนเค้ก: 1398,
    },
    {
      name: "Page C",
      จำนวนเค้ก: 9800,
    },
    {
      name: "Page D",
      จำนวนเค้ก: 3908,
    },
    {
      name: "Page E",
      จำนวนเค้ก: 4800,
    },
    {
      name: "Page F",
      จำนวนเค้ก: 3800,
    },
    {
      name: "Page G",
      จำนวนเค้ก: 4300,
    },
    {
      name: "Page G",
      จำนวนเค้ก: 4300,
    },
    {
      name: "Page G",
      จำนวนเค้ก: 4300,
    },
    {
      name: "Page G",
      จำนวนเค้ก: 4300,
    },
    {
      name: "Page G",
      จำนวนเค้ก: 4300,
    },
    {
      name: "Page G",
      จำนวนเค้ก: 4300,
    },
    {
      name: "Page G",
      จำนวนเค้ก: 4500,
    },
    // ข้อมูลอื่น ๆ ที่ต้องการเพิ่ม
  ];
  return (
    <>
      <Grid container justifyContent="center" >
        <Grid item sx={{ width: "100%" }}>
          {/* แสดง Component กราฟ */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontSize: 25, mt: 3 }}>
              จำนวนยอดการสั่งซื้อแต่ละแผนก
            </Typography>
          </Box>
          <ResponsiveContainer
            height={400}
            style={{
              marginTop: 20,
              
            }}
          >
            <BarChart data={cakeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="จำนวนเค้ก" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Chart;
