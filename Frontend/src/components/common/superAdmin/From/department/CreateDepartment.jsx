import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createDepartment, fetchDepartments } from "../../../../../slices/departmentSlice";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const CreateDepartment = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [departCode, setDepartCode] = useState("");
  const [departName, setDepartName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!departCode || !departName || Number(departCode) <= 0) {
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
      await dispatch(createDepartment({ departCode, departName })).unwrap();
      setDepartCode("");
      setDepartName("");
      handleClose(); // ปิด Dialog หลังจากสร้างสำเร็จ

      Swal.fire({
        position: "center",
        icon: "success",
        title: "สร้างข้อมูลสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(fetchDepartments()); // ดึงข้อมูลใหม่หลังสร้างสำเร็จ
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
    <Box id="form-create-department">
      <Button variant="contained" onClick={handleClickOpen}>
        สร้างข้อมูล
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>สร้างข้อมูลแผนก</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="departCode"
              name="departCode"
              label="รหัสแผนก"
              type="number"
              fullWidth
              variant="standard"
              value={departCode}
              onChange={(e) => setDepartCode(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="departName"
              name="departName"
              label="ชื่อแผนก"
              type="text"
              fullWidth
              variant="standard"
              value={departName}
              onChange={(e) => setDepartName(e.target.value)}
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

export default CreateDepartment;
