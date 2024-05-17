import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DepartmentService from '../../../../../services/DepartmentService';
import Swal from 'sweetalert2';
import { DEPARTMENT_PATH } from '../../../../../configs/constrants';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const UpdateDepartSuperAdmin = () => {
  const [departName, setDepartName] = useState("");
  const [departCode, setDepartCode] = useState("");
  const [updatedDepart, setUpdatedDepart] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await DepartmentService.getById(id)
      if (res.status === 200) {
        setDepartName(res.data.data[0].departName)
        setDepartCode(res.data.data[0].departCode)
      }
    } catch (error) {
      console.error("Error fetching: ", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await DepartmentService.updateById(id, {
        departName: departName,
        departCode: departCode
      })

      if (res.status === 200) {
        setUpdatedDepart(true)
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
  }

  const handleCancelClick = () => {
    navigate(DEPARTMENT_PATH)
  }

  useEffect(() => {
    if (updatedDepart) {
      setTimeout(() => {
        window.location.reload()
      }, 100);
    }
  }, [updatedDepart])

  return (
    <Box className="update-department" sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" fontWeight="bold">
          อัพเดทข้อมูล
        </Typography>
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
            // sx={{ ml: 2 }}
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
  )
}

export default UpdateDepartSuperAdmin