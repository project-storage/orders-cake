
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  { id: 1,title:"นาย",name: "กฤษณชัย",surname:"อุบลทิพย์",username: "kritsanachai",email: "kritsanachai@gmail.com", tel: "09876543321" },
  { id: 2,title:"นาย",name: "กฤษณชัย",surname:"อุบลทิพย์",username: "kritsanachai",email: "kritsanachai@gmail.com", tel: "09876543321" },
  { id: 3,title:"นาย",name: "กฤษณชัย",surname:"อุบลทิพย์",username: "kritsanachai",email: "kritsanachai@gmail.com", tel: "09876543321" },
];

// เพิ่มคอลัมน์เลขลำดับ
const rowsWithIndex = rows.map((row, index) => ({ ...row, index: index + 1 }));

const columns = [
  {field: "index", headerName: "#", width: 50 },
  {field: "title", headerName: "คำนำหน้า", width: 80 },
  {field: "name", headerName: "ชื่อ", width: 120 },
  {field: "surname", headerName: "นามสกุล", width: 120 },
  {field: "username", headerName: "ชื่อผู้ใช้งาน", width: 150 },
  {field: "email", headerName: "อีเมล", width: 200 },
  {field: "tel", headerName: "เบอร์โทร", width: 200 },
];
const DataTeachers = () => {
  return (
    <>
     <div style={{height: "100%",width:"100%"}}>
      <DataGrid rows={rowsWithIndex} columns={columns}/>
     </div>
    </>
  )
}

export default DataTeachers