import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { createCake } from "../../../../../slices/cakeSlice";
import Swal from "sweetalert2";

const CreateCake = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [cakeName, setCakeName] = useState("");
  const [price, setPrice] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cakeName || !price || Number(price) <= 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ถูกต้อง!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      await dispatch(createCake({ cakeName, price }));
      setCakeName("");
      setPrice("");
      handleClose();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "สร้างข้อมูลสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เกิดข้อผิดพลาดในการสร้างข้อมูล!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Box className="form-create-cake" sx={{ margin: "20px" }}>
      <Button variant="contained" onClick={handleClickOpen}>
        สร้างข้อมูล
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>สร้างข้อมูลเค้ก</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="cakeName"
              name="cakeName"
              label="ประเภทเค้ก"
              type="text"
              fullWidth
              variant="standard"
              value={cakeName}
              onChange={(e) => setCakeName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="price"
              name="price"
              label="ราคา"
              type="number"
              fullWidth
              variant="standard"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color="error">
                ยกเลิก
              </Button>
              <Button type="submit" color="success" variant="contained">
                ยืนยัน
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateCake;
