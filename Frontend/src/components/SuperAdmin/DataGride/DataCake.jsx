import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Swal from "sweetalert2";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FlexBetween from "../../FlexBetween";

const rows = [
  { id: 1, name: "ช็อคโกแลต", price: "200" },
  { id: 2, name: "เนยสด", price: "200" },
  { id: 3, name: "หน้าแยม", price: "200" },
  { id: 4, name: "กาแฟ", price: "200" },
];

const rowsNum = rows.map((row, index) => ({ ...row, index: index + 1 }));

const columns = [
  { field: "index", headerName: "#", width: 70 },
  { field: "name", headerName: "ชื่อเค้ก", width: 300 },
  { field: "price", headerName: "ราคา", width: 300 },
  {
    field: "actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => (
      <div>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<BorderColorIcon />}
            onClick={() => editCake(params.row.id, params.row.name)}
          >
            แก้ไข
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => deleteCake(params.row.id)}
            // onClick={() => handleDelete(params.row.id)}
          >
            ลบ
          </Button>
        </Stack>
      </div>
    ),
  },
];

// Functions
function deleteCake(id) {
  console.log("Delete cake with ID:", id);
  Swal.fire({
    title: "คุณต้องการลบ " + id + " ใช่ไหม?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "เสร็จสิ้น",
        showConfirmButton: false,
        icon: "success",
        timer: 800,
      });
    }
  });
}

function editCake(id, name) {
  Swal.fire({
    title: "แก้ไขเค้ก",
    input: "text",
    inputValue: name,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      const newName = result.value;
      console.log(`Edit cake with ID ${id} to ${newName}`);
    }
  });
}

function insertCake() {
  Swal.fire({
    title: "เพิ่มเค้ก",
    html: '<label for="swal-input1">ชื่อเค้ก :</label><input id="swal-input1" class="swal2-input" >',
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    preConfirm: () => {
      return [document.getElementById("swal-input1").value];
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const [newName] = result.value;
      console.log(`Add new cake with name: ${newName} `);
    }
  });
}

const DataCake = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
      <h1>ข้อมูลเค้กทั้งหมด</h1>
        <Box>
          <FlexBetween gap="1rem">
            <Stack
              direction="row"
              spacing={2}
            >
              <Button
                sx={{ m: 3 }}
                color="success"
                variant="contained"
                startIcon={<InsertDriveFileIcon />}
                onClick={() => insertCake()}
              >
                เพิ่มสินค้า
              </Button>
            </Stack>
          </FlexBetween>
        </Box>
      </FlexBetween>
      <Box>
        <DataGrid
          sx={{ height: "100%", width: "100%"}}
          rows={rowsNum}
          columns={columns}
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
    </Box>
  );
};

export default DataCake;
