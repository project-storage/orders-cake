import { Button, Stack } from "@mui/material";
import DataStudents from "../../components/layouts/SuperAdmin/DataStudents";
import { useNavigate } from "react-router-dom";
const Students = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between" , marginBottom: 2 }}
      >
        <h1>นักเรียน นักศึกษา</h1>
        <Button sx={{ m: 3 }} variant="contained" onClick={handleGoBack}>
          ย้อนกลับ
        </Button>
      </Stack>
      <DataStudents />
    </>
  );
};

export default Students;
