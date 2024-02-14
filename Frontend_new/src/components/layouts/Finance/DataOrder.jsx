import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const rows = [
  { id: 1, bookNumber: "001", orderNumber: "6543",idTeam: "คอมพิวเตอร์ธุรกิจ", numCake: "200 ปอนด์" , price: "40000 บาท",status: "รอตรวจสอบ"},
  { id: 2, bookNumber: "002", orderNumber: "6542",idTeam: "บัญชี", numCake: "100 ปอนด์" , price: "50000 บาท",status: "รอตรวจสอบ" },
  { id: 3, bookNumber: "003", orderNumber: "6533",idTeam: "ค้าปลีก", numCake: "140 ปอนด์" , price: "30000 บาท",status: "รอตรวจสอบ"},
];

const rowsWithIndex = rows.map((row, index) => ({ ...row, index: index + 1 }));

const columns = [
  { field: "id", headerName: "#", width: 100 },
  { field: "bookNumber", headerName: "เลขที่เล่ม", width: 120 },
  { field: "orderNumber", headerName: "เลขที่ออเดอร์", width: 120 },
  { field: "idTeam", headerName: "ชื่อทีม", width: 220 },
  { field: "numCake", headerName: "จำนวนเค้ก", width: 220 },
  { field: "price", headerName: "ราคาทั้งหมด", width: 220 },
  { field: "status", headerName: "สถานะ", width: 220 },
  {
    field: "action",
    headerName: "action",
    width: 200,
    renderCell: (params) => (
      <div>
        <Link to={`/superadmin/students/${params.row.id}`} className="menu-bars" >
          <Button variant="outlined" startIcon={<SearchIcon />}>
            ดูรายละเอียด
          </Button>
        </Link>
      </div>
    ),
  },
];

const DataOrder = () => {
  return (
    <>
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

export default DataOrder;
