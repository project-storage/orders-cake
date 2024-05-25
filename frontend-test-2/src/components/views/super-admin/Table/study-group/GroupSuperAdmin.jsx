import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UPDATE_GROUP_PATH } from '../../../../../configs/constrants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDegrees } from '../../../../../slices/degreeSlice';
import { fetchDepartments } from '../../../../../slices/departmentSlice';
import { deleteGroup, fetchGroups } from '../../../../../slices/groupSlice';
import { fetchUseTeacher } from '../../../../../slices/userSlice';

const GroupSuperAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { groups, loading: groupsLoading, error: groupsError } = useSelector((state) => state.groups);
  const { departments, loading: departmentsLoading, error: departmentsError } = useSelector((state) => state.departments);
  const { degrees, loading: degreesLoading, error: degreesError } = useSelector((state) => state.degrees);
  const { users: teachers, loading: teachersLoading, error: teachersError } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchDepartments());
    dispatch(fetchDegrees());
    dispatch(fetchUseTeacher());
  }, [dispatch]);

  if (groupsLoading || departmentsLoading || degreesLoading || teachersLoading) {
    return (
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
    );
  }

  if (groupsError || departmentsError || degreesError || teachersError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="h6" color="error">เกิดข้อผิดพลาดในการโหลดข้อมูล</Typography>
      </Box>
    );
  }

  const degreeMap = (degrees || []).reduce((map, degree) => {
    map[degree.id] = degree.degreeName;
    return map;
  }, {});

  const departmentMap = (departments || []).reduce((map, department) => {
    map[department.id] = department.departName;
    return map;
  }, {});

  const teacherMap = (teachers || []).reduce((map, teacher) => {
    map[teacher.id] = `${teacher.title}${teacher.name} ${teacher.surname}`;
    return map;
  }, {});

  const transformedGroups = (groups || []).map(group => ({
    ...group,
    degreeID: degreeMap[group.degreeID] || group.degreeID,
    departID: departmentMap[group.departID] || group.departID,
    teachID: teacherMap[group.teachID] || group.teachID
  }));

  const handleUpdate = (id) => {
    navigate(`${UPDATE_GROUP_PATH}/${id}`);
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
        await dispatch(deleteGroup(id))
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
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'degreeID',
      headerName: 'ระดับชั้น',
      sortable: false,
      width: 160,
    },
    {
      field: 'roomName',
      headerName: 'ห้อง',
      width: 100,
      editable: true,
    },
    {
      field: 'departID',
      headerName: 'แผนก',
      width: 180,
      editable: true,
    },
    {
      field: 'teachID',
      headerName: 'ครูที่ปรึกษา',
      width: 170,
      editable: true,
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 180,
      editable: true,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="info"
            startIcon={<FolderIcon />}
            onClick={() => handleUpdate(params.id)}
          >
            สมาชิกในห้องเรียน
          </Button>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 250,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<BorderColorIcon />}
            onClick={() => handleUpdate(params.id)}
            sx={{ ml: 2 }}
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
    <Box className="table-group" sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={transformedGroups}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
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
  );
};

export default GroupSuperAdmin;
