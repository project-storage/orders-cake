import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import DepartmentService from "../../../services/DepartmentService";

const CreateDepartMent = () => {
  const [departName, setDepartName] = useState("");
  const [departCode, setDepartCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await DepartmentService.createDepartment({
        departName: departName,
        departCode: departCode,
      });
      if (res.status === 200) {
        window.location.reload();
      }
      console.log(res.data.data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.res.data.message);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            เพิ่มข้อแผนก
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
              เพิ่มข้อแผนก
            </Button>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateDepartMent;
