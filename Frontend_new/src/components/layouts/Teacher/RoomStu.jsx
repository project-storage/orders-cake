import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

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
    renderCell: () => (
      <div>
        <Link to={'/teacher/orderstu'} className="menu-bars" >
          <Button variant="outlined" startIcon={<SearchIcon />}>
            ดูรายละเอียด
          </Button>
        </Link>
      </div>
    ),
  },
];

const RoomStu = () => {
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

export default RoomStu;
