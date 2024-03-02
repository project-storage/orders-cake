import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import FlexBetween from "../../FlexBetween";
import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import {
  CREATE_USER_PATH,
  DEPART_CAKE_PATH,
  DEPART_FINANCE_PATH,
  DEPART_PRODUCT_CAKE_PATH,
  DETAIL_USER_DATA_PATH,
  STUDENT_PATH,
  TEACHER_PATH,
  UPDATE_ADMIN_PATH,
} from "../../../config/constants";
import { useNavigate } from "react-router-dom";

const DataAllUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState(""); // กำหนดค่าเริ่มต้นเป็น ""
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedValue = event.target.value;

    // เช็คเงื่อนไขเพื่อเปลี่ยนเส้นทางเมื่อมีการเลือกคำว่า "ครู"
    if (selectedValue === "teacher") {
      navigate(TEACHER_PATH); // เปลี่ยนเส้นทางไปยัง URL /user/teachers
    }

    setSelectedValue(selectedValue);
  };
  const fetchData = async () => {
    const response = await UserService.getAllUser();
    setUsers(response.data.data);
  };

  const options = [
    { value: "", label: "------- เลือกผู้ใช้งาน -------" },
    // { value: "admin", label: "ผู้ดูแลระบบ" },
    { value: "teacher", label: "ครู", linkTo: TEACHER_PATH },
    // { value: "student", label: "นักศึกษา", linkTo: STUDENT_PATH },
    // { value: "finance", label: "ฝ่ายการเงิน", linkTo: DEPART_FINANCE_PATH },
    // { value: "cake", label: "ฝ่ายจ่ายเค้ก", linkTo: DEPART_CAKE_PATH },
    // {
    //   value: "product_cake",
    //   label: "ฝ่ายจ่ายผลิต",
    //   linkTo: DEPART_PRODUCT_CAKE_PATH,
    // },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const getRowId = (row) => row.id;

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleCreate = async () => {
    navigate(`${CREATE_USER_PATH}`);
  };

  const handleUpdate = async (id) => {
    navigate(`${UPDATE_ADMIN_PATH}/${id}`);
  };

  const handleDataUserDetails = async (id) => {
    navigate(`${DETAIL_USER_DATA_PATH}/${id}`);
  };

  const handleDeleteButtonClick = async (id) => {
    try {
      const response = await Swal.fire({
        title: "คุณแน่ใจ吗?",
        text: "คุณต้องการลบข้อมูลเค้กนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (response.isConfirmed) {
        await UserService.deleteUser(id);
        const updateUsers = users.filter((user) => user.id !== id);
        setUsers(updateUsers);
        Swal.fire("สำเร็จ!", "ข้อมูลเค้กถูกลบเรียบร้อย", "success");
      }
    } catch (error) {
      console.error("Error deleting cake:", error);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลเค้กได้", "error");
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 1,
    },
    {
      field: "title",
      headerName: "คำนำหน้า",
    },
    {
      field: "name",
      headerName: "ชื่อ",
      width: 150,
    },
    {
      field: "surname",
      headerName: "นามสกุล",
      width: 150,
    },
    { field: "telephone", headerName: "เบอร์โทร", width: 100 },
    { field: "role", headerName: "สถานะ", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      renderCell: (params) => (
        <Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<FindInPageOutlinedIcon />}
              onClick={() => handleDataUserDetails(params.id)}
            >
              รายละเอียดข้อมูล
            </Button>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<EditOutlinedIcon />}
              onClick={() => handleUpdate(params.id)}
            >
              แก้ไข
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteButtonClick(params.row.id)}
            >
              ลบข้อมูล
            </Button>
          </Stack>
        </Box>
      ),
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <h1>ข้อมูลผู้ใช้งานทั้งหมด</h1>

      <FlexBetween>
        <Box sx={{ width: "50%" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">
              เลือกผู้ใช้งาน
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue} // ใช้ค่าที่ถูกควบคุม
              label="เลือกผู้ใช้งาน"
              onChange={handleChange}
            >
              {/* ใช้ map เพื่อแสดง MenuItem จาก options */}
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  component={option.linkTo ? Link : "div"}
                  to={option.linkTo}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FlexBetween gap="1rem">
            <Button variant="outlined" color="success" onClick={handleCreate}>
              เพิ่มผู้ดูแลระบบ
            </Button>
          </FlexBetween>
        </Box>
      </FlexBetween>
      <Box>
        <DataGrid
          rows={users}
          getRowId={getRowId}
          columns={columns}
          checkboxSelection
          rowsPerPageOptions={[10, 25, 50]}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          selectionModel={selectionModel}
          onSelectionModelChange={handleSelectionModelChange}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
};

export default DataAllUser;
