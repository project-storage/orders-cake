import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import FlexBetween from "../../FlexBetween";

const rows = [
  {
    id: 1,
    title: "นาย",
    name: "กฤษณชัย",
    surname: "อุบลทิพย์",
    username: "kritsanachai",
    email: "kritsanachai@gmail.com",
    tel: "09876543321",
  },
  {
    id: 2,
    title: "นาย",
    name: "กฤษณชัย",
    surname: "อุบลทิพย์",
    username: "kritsanachai",
    email: "kritsanachai@gmail.com",
    tel: "09876543321",
  },
  {
    id: 3,
    title: "นาย",
    name: "กฤษณชัย",
    surname: "อุบลทิพย์",
    username: "kritsanachai",
    email: "kritsanachai@gmail.com",
    tel: "09876543321",
  },
];

// เพิ่มคอลัมน์เลขลำดับ
const rowsWithIndex = rows.map((row, index) => ({ ...row, index: index + 1 }));

const columns = [
  { field: "index", headerName: "#", width: 50 },
  {
    field: "title",
    headerName: "คำนำหน้า",
    flex: 1,
    minWidth: 70,
    maxWidth: 100,
  },
  { field: "name", headerName: "ชื่อ", flex: 2, minWidth: 100, maxWidth: 150 },
  {
    field: "surname",
    headerName: "นามสกุล",
    flex: 2,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    field: "username",
    headerName: "ชื่อผู้ใช้งาน",
    flex: 2,
    minWidth: 100,
    maxWidth: 200,
  },
  { field: "email", headerName: "อีเมล", width: 200 },
  { field: "tel", headerName: "เบอร์โทร", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <div>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<BorderColorIcon />}
            onClick={() =>
              handleEdit(
                params.row.id,
                params.row.title,
                params.row.name,
                params.row.surname,
                params.row.username,
                params.row.email,
                params.row.tel
              )
            }
          >
            แก้ไข
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            ลบ
          </Button>
        </Stack>
      </div>
    ),
  },
];

const handleEdit = (id, title, name, surname, username, email, tel) => {
  Swal.fire({
    title: "แก้ไขข้อมูลครู อาจารย์",
    html: `
      <label for="swal-input1" style="width: 120px;">คำนำหน้า:</label><input type="text" id="title" class="swal2-input" value="${title}"><br>
      <label for="swal-input1" style="width: 120px;">ชื่อ:</label><input type="text" id="name" class="swal2-input" value="${name}"><br>
      <label for="swal-input1" style="width: 120px;">นามสกุล:</label><input type="text" id="surname" class="swal2-input" value="${surname}"><br>
      <label for="swal-input1" style="width: 120px;">ชื่อผู้ใช้งาน:</label><input type="text" id="username" class="swal2-input" value="${username}"><br>
      <label for="swal-input1" style="width: 120px;">อีเมล:</label><input type="text" id="email" class="swal2-input" value="${email}"><br>
      <label for="swal-input1" style="width: 120px;">เบอร์โทร:</label><input type="text" id="tel" class="swal2-input" value="${tel}"><br>
    `,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    width: "800px",
    preConfirm: () => {
      return {
        stuCode: document.getElementById("stuCode").value,
        stuIdCard: document.getElementById("stuIdCard").value,
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

const handleDelete = (id) => {
  // เขียนโค้ดสำหรับการลบข้อมูลด้วย ID ที่ได้รับ
  console.log("Delete clicked for row with ID:", id);
};

const DataTeachers = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <h1>รายละเอียดข้อมูล ครู/อาจารย์</h1>
        <FlexBetween gap="1rem">
          <Stack direction="row" spacing={2}>
            <Button sx={{ m: 3 }} color="success" variant="contained">
              เพิ่ม ครู/อาจารย์
            </Button>
          </Stack>
        </FlexBetween>
      </FlexBetween>
      <Box>
        <DataGrid
          sx={{ height: "100%", width: "100%"}}
          rows={rowsWithIndex}
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

export default DataTeachers;
