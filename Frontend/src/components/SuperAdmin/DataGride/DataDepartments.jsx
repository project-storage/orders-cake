import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const rows = [
  { id: 1, name: "คอมพิวเตอร์ธุรกิจ" },
  { id: 2, name: "บัญชี" },
  { id: 3, name: "เทคโนโลยีสารสนเทศ" },
];

const rowsWithIndex = rows.map((row, index) => ({ ...row, index: index + 1 }));

const columns = [
  { field: "id", headerName: "#", width: 100 },
  { field: "name", headerName: "ชื่อแผนก", width: 400 },
  {
    field: "action",
    headerName: "action",
    width: 200,
    renderCell: (params) => (
      <div>
        <Link
          to={`{/superadmin/students/}${params.row.id}`}
          className="menu-bars"
        >
          <Button variant="outlined" startIcon={<SearchIcon />}>
            ดูรายละเอียด
          </Button>
        </Link>
      </div>
    ),
  },
];

const DataDepartments = () => {
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
  );
};

export default DataDepartments;
