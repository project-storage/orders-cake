import { Button, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Swal from "sweetalert2";

const rows = [
  { id: 1, degree: "ปวช.1", room: "2" },
  { id: 2, degree: "ปวช.2", room: "1" },
  { id: 3, degree: "ปวช.3", room: "1" },
];

const rowsWithIndex = rows.map((row, index) => ({ ...row, index: index + 1 }));

const columns = [
  { field: "id", headerName: "#", width: 100 },
  { field: "degree", headerName: "ชั้น", width: 400 },
  { field: "room", headerName: "ห้อง", width: 400 },
  {
    field: "action",
    headerName: "action",
    width: 200,
    renderCell: (params) => (
      <div>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<BorderColorIcon />}
            onClick={() =>
              editRoom(
                params.row.id,
                params.row.degree,
                params.row.room,
              )
            }
          >
            แก้ไข
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            // onClick={() => handleDelete(params.row.id)}
          >
            ลบ
          </Button>
        </Stack>
      </div>
    ),
  },
];


const editRoom = (id,degree, room) => {
    Swal.fire({
      title: "แก้ไขข้อมูลนักเรียน",
      html: `
        <label for="stuIdCard" style="width: 120px;">ชั้น:</label><input type="text" id="degree" class="swal2-input" value="${degree}"><br>
        <label for="stuIdCard" style="width: 120px;">ห้อง:</label><input type="text" id="room" class="swal2-input" value="${room}"><br>
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      width: "700px",
      preConfirm: () => {
        return {
        //   stuCode: document.getElementById("stuCode").value,
        //   stuIdCard: document.getElementById("stuIdCard").value,
          // เพิ่มการดึงค่าจาก input อื่นๆ ตามต้องการ
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { stuCode, stuIdCard } = result.value;
        console.log(`Edit student with ID ${id} to ${stuCode}, ${stuIdCard}`);
        // นี่คือตัวอย่างการดึงค่าจาก input อื่นๆ ในกรณีที่มี input เพิ่มเติม
      }
    });
  };



function insertRoom() {
    Swal.fire({
      title: "เพิ่มห้องเรียน",
      html: `<label for="swal-input1">ชั้น :</label><input id="swal-input1" class="swal2-input" ><br>
      <label for="swal-input1">ห้อง :</label><input id="swal-input1" class="swal2-input" >`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      width: "600px",
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
  

const DataRooms = () => {
  return (
    <>
    <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <h1>ห้องเรียน</h1>
        <Button
          sx={{ m: 3 }}
          color="success"
          variant="contained"
          startIcon={<InsertDriveFileIcon />}
          onClick={() => insertRoom()}
        >
          เพิ่มห้องเรียน
        </Button>
      </Stack>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rowsWithIndex}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
          headerClassName="custom-header-class"
        />
      </div>
    </>
  )
}

export default DataRooms;
