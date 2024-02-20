import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const rows = [
  {
    id: 1,
    stuCode: "65309010001",
    stuIdCard: "1739902009000",
    title: "นาย",
    name: "กฤษณชัย",
    surname: "อุบลทิพย์",
    email: "kritsanachai@gmail.com",
    degree: "ปวช.1",
    room: "1",
    tel: "09876543321",
  },
  {
    id: 2,
    stuCode: "65309010002",
    stuIdCard: "1739902009000",
    title: "นาย",
    name: "กฤษณชัย",
    surname: "อุบลทิพย์",
    email: "kritsanachai@gmail.com",
    degree: "ปวช.2",
    room: "3",
    tel: "09876543321",
  },
  {
    id: 3,
    stuCode: "65309010003",
    stuIdCard: "1739902009000",
    title: "นาย",
    name: "กฤษณชัย",
    surname: "อุบลทิพย์",
    email: "kritsanachai@gmail.com",
    degree: "ปวช.3",
    room: "2",
    tel: "09876543321",
  },
];

// เพิ่มคอลัมน์เลขลำดับ
const rowsWithIndex = rows.map((row, index) => ({ ...row, index: index + 1 }));

const columns = [
  { field: "index", headerName: "#", width: 50 },
  {
    field: "stuCode",
    headerName: "รหัสนักศึกษา",
    flex: 2,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    field: "stuIdCard",
    headerName: "หมายเลขบัตรประชาชน",
    flex: 2,
    minWidth: 150,
    maxWidth: 200,
  },
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
    field: "email",
    headerName: "อีเมล",
    flex: 2,
    minWidth: 120,
    maxWidth: 200,
  },
  { field: "degree", headerName: "ชั้น", flex: 1, minWidth: 70, maxWidth: 100 },
  { field: "room", headerName: "ห้อง", flex: 1, minWidth: 60, maxWidth: 90 },
  {
    field: "tel",
    headerName: "เบอร์โทร",
    flex: 2,
    minWidth: 120,
    maxWidth: 220,
  },
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
                params.row.stuCode,
                params.row.stuIdCard,
                params.row.title,
                params.row.name,
                params.row.surname,
                params.row.email,
                params.row.degree,
                params.row.room,
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

const handleEdit = (id, stuCode, stuIdCard, title, name, surname, email, degree, room, tel) => {
  Swal.fire({
    title: "แก้ไขข้อมูลนักเรียน",
    html: `
      <label for="swal-input1" style="width: 120px;">รหัสนักศึกษา :</label><input type="text" id="stuCode" class="swal2-input" value="${stuCode}" ><br>
      <label for="stuIdCard" style="width: 120px;">หมายเลขบัตรประชาชน:</label><input type="text" id="stuIdCard" class="swal2-input" value="${stuIdCard}"><br>
      <label for="stuIdCard" style="width: 120px;">คำนำหน้า:</label><input type="text" id="title" class="swal2-input" value="${title}"><br>
      <label for="stuIdCard" style="width: 120px;">ชื่อ:</label><input type="text" id="name" class="swal2-input" value="${name}"><br>
      <label for="stuIdCard" style="width: 120px;">นามสกุล:</label><input type="text" id="surname" class="swal2-input" value="${surname}"><br>
      <label for="stuIdCard" style="width: 120px;">อีเมล:</label><input type="text" id="email" class="swal2-input" value="${email}"><br>
      <label for="stuIdCard" style="width: 120px;">ชั้น:</label><input type="text" id="degree" class="swal2-input" value="${degree}"><br>
      <label for="stuIdCard" style="width: 120px;">ห้อง:</label><input type="text" id="room" class="swal2-input" value="${room}"><br>
      <label for="stuIdCard" style="width: 120px;">เบอร์โทร:</label><input type="text" id="tel" class="swal2-input" value="${tel}"><br>
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

const DataStudents = () => {
  const { id } = useParams();
  return (
    <>
      <h2>แผนก : {id}</h2>
      <div style={{ height: "100%", width: "100%", mt: 3 }}>
        <DataGrid
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
      </div>
    </>
  );
};

export default DataStudents;
