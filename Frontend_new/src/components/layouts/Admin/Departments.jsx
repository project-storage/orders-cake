import DepartmentCard from "./../../components/layouts/Admin/DepartmentCard";
import { Grid, Box} from "@mui/material";
const Departments = () => {
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
    <>
      <Box>
        <h1>นักเรียน นักศึกษา</h1>
      </Box>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center" }}
        spacing={2} // เพิ่มระยะห่างระหว่างการ์ด
      >
        {departmentData.map((data, index) =>(
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DepartmentCard name = {data.name}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Departments;
