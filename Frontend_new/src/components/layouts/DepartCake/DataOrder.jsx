import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const rows = [
  { id: 1, date: "21/02/24",bookNumber: "001", orderNumber: "6543",name:"กฤษณชัย", numCake: "200 ปอนด์" , price: "40000 บาท",status: "รอรับออเดอร์"},
  { id: 2, date: "21/02/24",bookNumber: "002", orderNumber: "6542",name:"กฤษณชัย", numCake: "100 ปอนด์" , price: "50000 บาท",status: "รอรับออเดอร์" },
  { id: 3, date: "21/02/24",bookNumber: "003", orderNumber: "6533",name:"กฤษณชัย", numCake: "140 ปอนด์" , price: "30000 บาท",status: "รอรับออเดอร์"},
];

const rowsWithIndex = rows.map((row, index) => ({ ...row, index: index + 1 }));

const columns = [
  { field: "id", headerName: "#", width: 70 },
  { field: "date", headerName: "วันที่", minWidth: 120, maxWidth: 200 },
  { field: "bookNumber", headerName: "เลขที่เล่ม",minWidth: 100, maxWidth: 150 },
  { field: "orderNumber", headerName: "เลขที่ออเดอร์", minWidth: 100, maxWidth: 200},
  { field: "name", headerName: "ชื่อ", minWidth: 100, maxWidth: 200},
  { field: "numCake", headerName: "จำนวนเค้ก", minWidth: 130, maxWidth: 200 },
  { field: "price", headerName: "ราคาทั้งหมด", minWidth: 130, maxWidth: 250 },
  { field: "status", headerName: "สถานะ", minWidth: 130, maxWidth: 250 },
  {
    field: "action",
    headerName: "action",
    width: 200,
    renderCell: (params) => (
      <div>
        {/* <Link to={`/superadmin/students/${params.row.id}`} className="menu-bars" > */}
          <Button variant="outlined" startIcon={<SearchIcon />}>
            ดูรายละเอียด
          </Button>
        {/* </Link> */}
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
