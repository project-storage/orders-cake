import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DEPARTMENT_PATH } from '../../../../../configs/constrants';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { departmentGetById, updateDepartment } from '../../../../../slices/departmentSlice';

const UpdateDepartSuperAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { department, loading, error: fetchError } = useSelector((state) => state.departments);
  const [error, setError] = useState(null);

  const [departName, setDepartName] = useState("");
  const [departCode, setDepartCode] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(departmentGetById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (department) {
      setDepartName(department.departName);
      setDepartCode(department.departCode);
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(updateDepartment({ id, departName, departCode })).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "อัพเดทข้อมูลสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error("Error updated", error);
    }
  };

  const handleCancelClick = () => {
    navigate(DEPARTMENT_PATH);
  };

  return (
    <Box className="update-department" sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" fontWeight="bold">
          อัพเดทข้อมูล
        </Typography>
        {fetchError && <Typography color="error">{fetchError}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item md={6} xs={12}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="departName"
              name="departName"
              label="ชื่อสาขา"
              type="text"
              fullWidth
              value={departName}
              onChange={(e) => setDepartName(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              margin="dense"
              id="departCode"
              name="departCode"
              label="รหัสสาขา"
              type="number"
              fullWidth
              value={departCode}
              onChange={(e) => setDepartCode(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            color="success"
            variant="contained"
            type="submit"
          >
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
        </Box>
      </form>
    </Box>
  );
}

export default UpdateDepartSuperAdmin;
