
import { Box } from "@mui/material";
import DataStudents from "../../components/layouts/Admin/DataStudents";
const Students = () => {
  
  return (
    <>
      <Box>
        <h1>นักเรียน นักศึกษา</h1>
      </Box>
      {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontSize: 25 }}>
          กรุณาเลือกแผนก
        </Typography>
      </Box> */}
      <DataStudents/>
      
    </>
  );
};

export default Students;
