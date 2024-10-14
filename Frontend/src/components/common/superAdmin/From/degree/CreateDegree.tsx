import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createDegree, fetchDegrees } from "../../../../../slices/degreeSlice";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const CreateDegree = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [degreeName, setDegreeName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!degreeName.trim()) {
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
      await dispatch(createDegree({ degreeName })).unwrap();
      setDegreeName("");
      handleClose();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "สร้างข้อมูลสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(fetchDegrees()); // อัพเดทข้อมูลหลังสร้างสำเร็จ
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message || "เกิดข้อผิดพลาดในการสร้างข้อมูล!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Box id="form-create-degree">
      <Button variant="contained" onClick={handleClickOpen}>
        สร้างข้อมูล
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>สร้างข้อมูลระดับชั้น</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="degreeName"
              name="degreeName"
              label="ระดับชั้น"
              type="text"
              fullWidth
              variant="standard"
              value={degreeName}
              onChange={(e) => setDegreeName(e.target.value)}
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

export default CreateDegree;
