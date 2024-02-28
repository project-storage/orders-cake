import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CakeService from "../../../services/CakeService";

const CreateCake = () => {
  const [cakeName, setCakeName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await CakeService.createCake({
        cakeName: cakeName,
        price: price,
      });
      if (res.status === 200) {
        window.location.reload();
      }
      console.log(res.data.cake);
    } catch (error) {
      console.error("Error:", error.res);
      setError(error.res.cake.message);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            เพิ่มข้อมูลเค้ก
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Typography>ชื่อเค้ก</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={cakeName}
                onChange={(e) => setCakeName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography>ราคา</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>

            <Button
              sx={{ m: 3 }}
              color="success"
              variant="contained"
              type="submit"
            >
              เพิ่มข้อมูลเค้ก
            </Button>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateCake;
