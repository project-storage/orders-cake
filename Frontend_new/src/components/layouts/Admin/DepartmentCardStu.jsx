import { Grid,Card, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";


const DepartmentCard = () => {
  const departmentData = [
    {id: 1, name: "คอมพิวเตอร์ธุรกิจ"},
    {id: 2, name: "บัญชี"},
    {id: 3, name: "คอมพิวเตอร์ธุรกิจ"},
    {id: 4, name: "บัญชี"},
    {id: 5, name: "คอมพิวเตอร์ธุรกิจ"},
    {id: 6, name: "บัญชี"},
    {id: 7, name: "คอมพิวเตอร์ธุรกิจ"},
    {id: 8, name: "บัญชี"},
    {id: 9, name: "คอมพิวเตอร์ธุรกิจ"},
    {id: 10, name: "บัญชี"},
    {id: 11, name: "คอมพิวเตอร์ธุรกิจ"},
    {id: 12, name: "บัญชี"},
  ]

  return (
    <Box sx={{position: "absolute",}}>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", mt: 1 }}
        spacing={2} // เพิ่มระยะห่างระหว่างการ์ด
      >
        {departmentData.map((data, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Link to={
                `/admin/departmentstudent/room/${data.id}`
              }
              className="menu-bars" >
            <Card variant="outlined" sx={cardStyle} >
              {/* <Box sx={{ padding: 0, margin: 0,  }}> */}
              <Typography sx={{ fontSize: 20 }} color="#fff">
                {data.name}
              </Typography>
              {/* </Box> */}
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


const cardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 1,
  margin: 1,
  height: 80,
  background: "#73B2EA",
  border: 0,
  // borderRadius: "20%",
};

export default DepartmentCard;
