import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DEPARTMENT_PATH } from "../../../config/constants";
import DepartmentService from "../../../services/DepartmentService";

const UpdateDepartment = () => {
  const [departName, setDepartName] = useState("");
  const [departCode, setDepartCode] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await DepartmentService.getDepartmentById(id);
        if (response.status === 200) {
          setDepartCode(response.data.data[0].departCode);
          setDepartName(response.data.data[0].departName);
        }
      } catch (error) {
        console.error("Error", error);
        setError(error);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await DepartmentService.updateDepartment(id, {
        departCode: departCode,
        departName: departName,
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error);
    }
  };

  const handleCancelClick = () => {
    navigate(DEPARTMENT_PATH);
  };
  
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            อัพเดทข้อมูลแผนก
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Typography>รหัสแผนก</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={departCode}
                onChange={(e) => setDepartCode(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography>แผนก</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={departName}
                onChange={(e) => setDepartName(e.target.value)}
              />
            </Grid>

            <Button
              sx={{ m: 3 }}
              color="success"
              variant="contained"
              type="submit"
            >
              ยืนยัน
            </Button>
            <Button
              sx={{ m: 3 }}
              color="error"
              variant="contained"
              onClick={handleCancelClick}
              type="button"
            >
              ยกเลิก
            </Button>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateDepartment;
