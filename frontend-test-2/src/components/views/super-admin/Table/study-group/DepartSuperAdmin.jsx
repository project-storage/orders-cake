import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from 'react-router-dom';
import { UPDATE_DEPARTMENT_PATH } from '../../../../../configs/constrants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, deleteDepartment } from '../../../../../slices/departmentSlice'

const DepartSuperAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { departments, loading, error } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleUpdate = (id) => {
    navigate(`${UPDATE_DEPARTMENT_PATH}/${id}`);
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
        await dispatch(deleteDepartment(id));
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
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลได้", "error");
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: "departName", headerName: "ชื่อสาขา", width: 200 },
    { field: "departCode", headerName: "รหัสสาขา", width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<BorderColorIcon />}
              onClick={() => handleUpdate(params.row.id)}
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
      {loading ? (
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
        </Box>
      ) : (
        <Box sx={{ height: 410, width: '100%' }}>
          <DataGrid
            rows={departments}
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
            slots={{ toolbar: GridToolbar }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableExportSelector
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default DepartSuperAdmin;
