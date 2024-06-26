import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DepartmentService from "../../../services/DepartmentService";
import FlexBetween from "../../FlexBetween";
import { Stack, width } from "@mui/system";
import { UPDATE_DEPARTMENT_PATH } from "../../../config/constants";
import Swal from "sweetalert2";

const DataDepartments = () => {
  const [allDepartMent, setAllDepartment] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await DepartmentService.getAllDepartment();
      setAllDepartment(response.data.data);
    } catch (error) {
      console.error("Error Fetching Data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const getRowId = (row) => row.id;

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleUpdate = async (id) => {
    navigate(`${UPDATE_DEPARTMENT_PATH}/${id}`);
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await Swal.fire({
        title: "คุณแน่ใจ",
        text: "คุณต้องการลบข้อมูลนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (response.isConfirmed) {
        await DepartmentService.deleteDepartment(id);
        const updateDepartment = allDepartMent.filter(
          (department) => department.id !== id
        );
        setAllDepartment(updateDepartment);
        Swal.fire("สำเร็จ!", "ข้อมูลแผนกถูกลบเรียบร้อย", "success");
      }
    } catch (error) {
      console.error("Error deleting cake:", error);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลแผนกได้", "error");
    }
  };

  const columns = [
    { field: "id", headerName: "#", width: 1 },
    { field: "departCode", headerName: "ชื่อแผนก", flex: 0.1 },
    { field: "departName", headerName: "ชื่อแผนก", flex: 0.1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      renderCell: (params) => (
        <Box>
          <Stack direction="row" spacing={2}>
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
        <Typography variant="h4" fontWeight="bold" mb="1rem">
          ข้อมูลแผนกทั้งหมด
        </Typography>
      </FlexBetween>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <div>
            <CircularProgress />
          </div>
        </Box>
      ) : (
        <DataGrid
          rows={allDepartMent}
          getRowId={getRowId}
          columns={columns}
          checkboxSelection
          pageSizeOptions={[5, 10, 20, 50, 100, 200, 300, 500]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
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
  );
};

export default DataDepartments;
