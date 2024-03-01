import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CakeService from "../../../services/CakeService";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_PATH } from "../../../config/constants";

const UpdateCake = () => {
  const [cakeName, setCakeName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CakeService.getCakeById(id);
        if (response.status === 200) {
          setCakeName(response.data.data[0].cakeName);
          setPrice(response.data.data[0].price);
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
      const response = await CakeService.updateCake(id, {
        cakeName: cakeName,
        price: price,
      });
      if (response.status === 200) {
        window.location.reload();
      }
      console.log(res.data.cake);
    } catch (error) {
      console.error("Error:", error.response);
      setError(error);
    }
  };

  const handleCancelClick = () => {
    navigate(PRODUCT_PATH);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            อัพเดทข้อมูลเค้ก
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

export default UpdateCake;
