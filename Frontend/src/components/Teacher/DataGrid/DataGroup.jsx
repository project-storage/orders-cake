import React, { useEffect, useState } from "react";
import GroupService from "../../../services/GroupService";
import { Box, Button, Stack } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DegreeService from "../../../services/DegreeService";
import TeacherService from "../../../services/TeacherService";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import DepartmentService from "../../../services/DepartmentService";
import Swal from "sweetalert2";

const DataGroup = () => {
  const [allGroup, setAllGroup] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [departID, setDepartID] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const resGroup = await GroupService.getGroupInfo();
      const resDegree = await DegreeService.getAllDegree();
      const resDepart = await DepartmentService.getAllDepartment();
      setAllGroup(resGroup.data.data);
      setDegrees(resDegree.data.data);
      setDepartID(resDepart.data.data);
    } catch (error) {
      console.error("Error Fetch Data", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(fetchData());
  }, []);

  const getRowId = (row) => row.id;

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  
  const handleDetailGroup = () => {};
  const handleUpdate = async () => {};

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await Swal.fire({
        title: "คุณแน่ใจ吗?",
        text: "คุณต้องการลบข้อมูลเค้กนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (response.isConfirmed) {
        await GroupService.deleteGroup(id);
        const updateGroups = allGroup.filter((group) => group.id !== id);
        setAllGroup(updateGroups);
        Swal.fire("สำเร็จ!", "ข้อมูลเค้กถูกลบเรียบร้อย", "success");
      }
    } catch (error) {
      console.error("Error deleting cake:", error);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลเค้กได้", "error");
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
    },
    {
      field: "degreeID",
      headerName: "ระดับชั้น",
      valueGetter: (params) => {
        const degree = degrees.find((degree) => degree.id === params.value);
        return degree ? degree.degreeName : "";
      },
    },
    {
      field: "roomName",
      headerName: "ห้องเรียน",
    },
    {
      field: "departID",
      headerName: "แผนก",
      flex: 0.1,
      valueGetter: (params) => {
        const department = departID.find(
          (department) => department.id === params.value
        );
        return department ? department.departName : "";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      renderCell: (params) => (
        <Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<BookOutlinedIcon />}
              onClick={handleDetailGroup}
            >
              รายละเอียดห้องเรียน
            </Button>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<BorderColorIcon />}
              onClick={handleUpdate}
            >
              แก้ไข
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteButtonClick(params.row.id)}
            >
              ลบข้อมูล
            </Button>
          </Stack>
        </Box>
      ),
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <h1>ข้อมูลห้องเรียนที่อยู่ในการดูแล</h1>
      </FlexBetween>

      <Box>
        {error ? (
          <div>Error fetching cakes: {error.message}</div>
        ) : (
          <DataGrid
            rows={allGroup}
            getRowId={getRowId}
            columns={columns}
            checkboxSelection
            rowsPerPageOptions={[10, 25, 50]}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 250 },
              },
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DataGroup;
