import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchCakeById, updateCake } from "../../../../../slices/cakeSlice";
import { CAKE_PATH } from "../../../../../configs/constants";
import { RootState } from "../../../../../store/store";

const UpdateCake = () => {
  const [cakeName, setCakeName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cake,
    loading,
    error: fetchError,
  } = useSelector((state: RootState) => state.cakes);

  useEffect(() => {
    if (id) {
      dispatch(fetchCakeById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (cake) {
      setCakeName(cake.cakeName);
      setPrice(cake.price);
    }
  }, [cake]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedPrice = parseFloat(price).toFixed(2);
    try {
      await dispatch(
        updateCake({ id, data: { cakeName, price: formattedPrice } })
      ).unwrap();
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "อัพเดทข้อมูลสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(CAKE_PATH);
    } catch (error) {
      console.error("Error updating cake:", error);
      setError(error.message || "An error occurred while updating the cake.");
    }
  };

  const handleCancelClick = () => {
    navigate(CAKE_PATH);
  };

  return (
    <Card id="update-cake" sx={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        {fetchError && <Typography color="error">{fetchError}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={12}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="cakeName"
              name="cakeName"
              label="ชื่อเค้ก"
              type="text"
              fullWidth
              value={cakeName}
              onChange={(e) => setCakeName(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="ราคา"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Button color="success" variant="contained" type="submit">
              อัพเดทข้อมูล
            </Button>
            <Button
              sx={{ ml: 1 }}
              color="error"
              variant="contained"
              onClick={handleCancelClick}
            >
              ยกเลิก
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default UpdateCake;
