import { DataGrid } from "@mui/x-data-grid";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const rows = [
  {
    id: 1,
    stuCode: "65309010001",
    stuIdCard: "1739902009000",
    title: "นาย",
    name: "กฤษณชัย",
    surname: "อุบลทิพย์",
    username: "kritsanachai",
    department: "คอมพิวเตอร์ธุรกิจ",
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
    username: "kritsanachai",
    department: "บัญชี",
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
    username: "kritsanachai",
    department: "เทคโนโลยีสารสนเทศ",
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
    field: "username",
    headerName: "ชื่อผู้ใช้งาน",
    flex: 2,
    minWidth: 120,
    maxWidth: 200,
  },
  {
    field: "department",
    headerName: "แผนก",
    flex: 2,
    minWidth: 100,
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
            onClick={() => handleEdit(params.row.id)}
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

const handleEdit = (id) => {
  // เขียนโค้ดสำหรับการแก้ไขข้อมูลด้วย ID ที่ได้รับ
  console.log("Edit clicked for row with ID:", id);
};

const handleDelete = (id) => {
  // เขียนโค้ดสำหรับการลบข้อมูลด้วย ID ที่ได้รับ
  console.log("Delete clicked for row with ID:", id);
};

const DataStudents = () => {
  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid rows={rowsWithIndex} columns={columns} />
      </div>
    </>
  );
};

export default DataStudents;
