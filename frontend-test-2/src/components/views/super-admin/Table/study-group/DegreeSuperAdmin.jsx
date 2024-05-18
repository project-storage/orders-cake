import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDegree, fetchDegrees } from '../../../../../slices/degreeSlice';
import { UPDATE_DEGREE_PATH } from '../../../../../configs/constrants';

const DegreeSuperAdmin = () => {
  const { degrees, loading, error } = useSelector((state) => state.degrees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDegrees());
  }, [dispatch]);

  const handleUpdate = (id) => {
    navigate(`${UPDATE_DEGREE_PATH}/${id}`);
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await Swal.fire({
        title: 'คุณแน่ใจหรือไม่ที่จะลบข้อมูล',
        text: 'โปรดตรวจสอบข้อมูลก่อนลบ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก',
      });

      if (response.isConfirmed) {
        await dispatch(deleteDegree(id));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'สำเร็จ!',
          text: 'ข้อมูลถูกลบเรียบร้อย!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถลบข้อมูลได้', 'error');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'degreeName', headerName: 'ระดับชั้น', width: 200 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => (
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
      ),
    },
  ];

  return (
    <Box className="table-degree">
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
        <Box sx={{ height: 370, width: '100%' }}>
          <DataGrid
            rows={degrees}
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
            loading={loading}
            error={error}
          />
        </Box>)}

    </Box>
  );
};

export default DegreeSuperAdmin;
