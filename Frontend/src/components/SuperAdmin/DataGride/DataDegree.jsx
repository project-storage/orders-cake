import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FlexBetween from "../../FlexBetween";
import { useEffect, useState } from "react";
import DegreeService from "../../../services/DegreeService";

const DataDegree = () => {
  const [allDegree, setAllDegree] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await DegreeService.getAllDegree();
      setAllDegree(response.data.data);
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

  const handleUpdate = async () => {};
  const handleDeleteButtonClick = async () => {};

  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 0.1,
    },
    {
      field: "degreeName",
      headerName: "ระดับชั้น",
      flex: 0.1,
    },
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
              onClick={handleUpdate}
            >
              แก้ไข
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteButtonClick}
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
        <h1>ข้อมูลระดับชั้นทั้งหมด</h1>
      </FlexBetween>

      <Box>
        {error ? (
          <div>Error fetching cakes: {error.message}</div>
        ) : (
          <DataGrid
            rows={allDegree}
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

export default DataDegree;
