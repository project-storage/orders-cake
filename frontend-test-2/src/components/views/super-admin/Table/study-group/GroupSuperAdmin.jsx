import React, { useEffect, useState } from 'react';
import GroupService from '../../../../../services/GroupService';
import DepartmentService from '../../../../../services/DepartmentService';
import DegreeService from '../../../../../services/DegreeService';
import UserService from '../../../../../services/UserService';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UPDATE_GROUP_PATH } from '../../../../../configs/constrants';

const GroupSuperAdmin = () => {
  const [groups, setGroups] = useState([]);
  const [departs, setDeparts] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const resGroup = await GroupService.getAll();
      const resDepart = await DepartmentService.getAll();
      const resDegree = await DegreeService.getAll();
      const resTeacher = await UserService.getUseTeacher();

      setGroups(resGroup.data.data);
      setDeparts(resDepart.data.data);
      setDegrees(resDegree.data.data);
      setTeachers(resTeacher.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const degreeMap = degrees.reduce((map, degree) => {
    map[degree.id] = degree.degreeName;
    return map;
  }, {});

  const departmentMap = departs.reduce((map, department) => {
    map[department.id] = department.departName;
    return map;
  }, {});

  const teacherMap = teachers.reduce((map, teacher) => {
    map[teacher.id] = `${teacher.title}${teacher.name} ${teacher.surname}`;
    return map;
  }, {});

  const transformedGroups = groups.map(group => ({
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
        await GroupService.deleteById(id);
        const updatedGroups = groups.filter((group) => group.id !== id);
        setGroups(updatedGroups);
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
    <Box className="table-group">
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
        <Box sx={{ height: 400, width: '100%' }}>
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
      )}
    </Box>
  );
};

export default GroupSuperAdmin;
