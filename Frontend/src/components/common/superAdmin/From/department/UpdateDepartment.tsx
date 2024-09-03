import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {  DEPARTMENT_PATH } from "../../../../../configs/constants";
import { RootState } from "../../../../../store/store";
import {
  fetchDepartmentById,
  updateDepartment,
} from "../../../../../slices/departmentSlice";

const UpdateDepartment = () => {
  const [departCode, setDepartCode] = useState<string>("");
  const [departName, setDepartName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    department,
    loading,
    error: fetchError,
  } = useSelector((state: RootState) => state.departments);

  useEffect(() => {
    if (id) {
      dispatch(fetchDepartmentById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (department) {
      setDepartCode(department.departCode);
      setDepartName(department.departName);
    }
  }, [department]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDepartCode = parseFloat(departCode).toFixed(2);
    try {
      await dispatch(
        updateDepartment({
          id,
          data: { departCode: formattedDepartCode, departName },
        })
      ).unwrap();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "อัพเดทข้อมูลสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(DEPARTMENT_PATH);
    } catch (error) {
      console.error("Error updating cake:", error);
      setError(error.message || "An error occurred while updating the cake.");
    }
  };

  const handleCancelClick = () => {
    navigate(DEPARTMENT_PATH);
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
              id="departCode"
              name="departCode"
              label="รหัสแผนก"
              type="number"
              fullWidth
              value={departCode}
              onChange={(e) => setDepartCode(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              margin="dense"
              id="departName"
              name="departName"
              label="ชื่อแผนก"
              type="text"
              fullWidth
              value={departName}
              onChange={(e) => setDepartName(e.target.value)}
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

export default UpdateDepartment;
