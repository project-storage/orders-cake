import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DEGREE_PATH } from "../../../config/constants";
import DegreeService from "../../../services/DegreeService";

const UpdateDegree = () => {
  const [degreeName, setDegreeName] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await DegreeService.getDegreeById(id);
        if (response.status === 200) {
          setDegreeName(response.data.data[0].degreeName);
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
      const response = await DegreeService.updateDegree(id, {
        degreeName: degreeName,
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
    navigate(DEGREE_PATH);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            อัพเดทข้อมูลระดับชั้น
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
          <Box>
            <Button
              color="success"
              variant="outlined"
              type="submit"
              sx={{ mr: 1 }}
            >
              <Typography variant="h6">ยืนยัน</Typography>
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={handleCancelClick}
              type="button"
            >
              <Typography variant="h6"> ยกเลิก</Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateDegree;
