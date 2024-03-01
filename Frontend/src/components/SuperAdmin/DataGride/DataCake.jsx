import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Swal from "sweetalert2";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FlexBetween from "../../FlexBetween";
import { useEffect, useState } from "react";
import CakeService from "../../../services/CakeService";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { UPDATE_CAKEA_PATH } from "../../../config/constants";

const DataCake = () => {
  const [cakes, setCakes] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await CakeService.getAllCakes();
      setCakes(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching cakes:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRowId = (row) => row.id;

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleUpdate = async (id) => {
    navigate(`${UPDATE_CAKEA_PATH}/${id}`);
  };

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
        await CakeService.deleteCake(id);
        const updatedCakes = cakes.filter((cake) => cake.id !== id);
        setCakes(updatedCakes);
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
      flex: 0.1,
    },
    {
      field: "cakeName",
      headerName: "ชื่อเค้ก",
      flex: 0.1,
    },
    { field: "price", headerName: "ราคา", flex: 0.1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      renderCell: (params) => (
        <div>
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
        </div>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <h1>ข้อมูลเค้กทั้งหมด</h1>
      </FlexBetween>

      <Box>
        {error ? (
          <div>Error fetching cakes: {error.message}</div>
        ) : (
          <DataGrid
            rows={cakes}
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

export default DataCake;
