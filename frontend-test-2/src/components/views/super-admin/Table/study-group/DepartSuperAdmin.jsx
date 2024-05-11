import React, { useEffect, useState } from 'react'
import DepartmentService from '../../../../../services/DepartmentService'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Swal from 'sweetalert2'
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from 'react-router-dom'

const DepartSuperAdmin = () => {
  const [departs, setDeparts] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await DepartmentService.getAll()
      setDeparts(res.data.data)
    } catch (error) { 
      console.error("Error fetching: ", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);


  const handleUpdate = async (id) => {
    navigate(`${UPDATE_DEGREE_PATH}/${id}`);
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await Swal.fire({
        title: "คุณแน่ใจหรือไม่ที่จะลบข้อมูล",
        text: "โปรดตรวจสอบข้อมูลก่อนลบ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (response.isConfirmed) {
        await DepartmentService.deleteById(id);
        const updatedDepart = departs.filter((depart) => depart.id !== id);
        setDeparts(updatedDepart);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "สำเร็จ!",
          text: `ข้อมูลถูกลบเรียบร้อย!`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลเค้กได้", "error");
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: "departName", headerName: "ชื่อสาขา", width: 200 },
    { field: "departCode", headerName: "รหัสสาขา", width: 200 },
    {
      field: 'Action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<BorderColorIcon />}
              onClick={() => handleUpdate(params.id)}
            >
              แก้ไข
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteButtonClick(params.row.id)}
              sx={{ ml: 2 }}
            >
              ลบข้อมูล
            </Button>
          </Box>
        )
      }
    },
  ];
  return (
    <Box className="table-department">
      {
        loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              textAlign: 'center'
            }}
          >
            <Box>
              <CircularProgress />
              <Typography>กำลังโหลดข้อมูลโปรดรอสักครู่....</Typography>
            </Box>
          </Box >
        ) : (
          <Box sx={{ height: 370, width: '100%' }}>
            <DataGrid
              rows={departs}
              columns={columns}
              sortModel={[
                {
                  field: 'id',
                  sort: 'desc',
                },
              ]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              components={{
                Toolbar: GridToolbar
              }}
              componentsProps={{
                toolbar: {
                  filterVisible: true,
                }
              }}
            />
          </Box>
        )}
    </Box>
  )
}

export default DepartSuperAdmin  
