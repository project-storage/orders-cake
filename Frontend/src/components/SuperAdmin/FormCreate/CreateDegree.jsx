import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import DegreeService from "../../../services/DegreeService";

const CreateDegree = () => {
  const [degreeName, setDegreeName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await DegreeService.createDegree({
        degreeName: degreeName,
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
            เพิ่มข้อระดับชั้น
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Typography>ระดับชั้น</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={degreeName}
                onChange={(e) => setDegreeName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button color="success" variant="outlined" type="submit">
            <Typography variant="h6">เพิ่มข้อระดับชั้น</Typography>
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateDegree;
