import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchDepartments,
  deleteDepartment,
} from "../../../../slices/departmentSlice";
import { UPDATE_DEPARTMENT_PATH } from "../../../../configs/constants";
import {
  CircularProgress,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Grid,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FlexBetween from "../../../../configs/FlexBetween";

const DepartmentTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { departments, loading, error } = useSelector(
    (state) => state.departments
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleChangePage = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchNameChange = (
    event
  ) => {
    setSearchName(event.target.value);
    setPage(0);
  };

  const handleSearchCodeChange = (
    event
  ) => {
    setSearchCode(event.target.value);
    setPage(0);
  };

  const handleSelectDepartment = (id) => {
    setSelectedDepartments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((departmentId) => departmentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await Swal.fire({
        title: "คุณแน่ใจหรือไม่ที่จะลบข้อมูล",
        text: "โปรดตรวจสอบข้อมูลก่อนลบ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (response.isConfirmed) {
        await dispatch(deleteDepartment(id));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "สำเร็จ!",
          text: "ข้อมูลถูกลบเรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลแผนกได้", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedDepartments.length === 0) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "กรุณาเลือกแผนกอย่างน้อยหนึ่งแผนกเพื่อลบ.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      title: "แน่ใจหรือไม่?",
      text: "เมื่อลบแล้ว, แผนกที่คุณเลือกไว้จะถูกลบหายไป!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Promise.all(
          selectedDepartments.map((id) => dispatch(deleteDepartment(id)))
        );
        setSelectedDepartments([]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "แผนกที่คุณเลือกไว้ถูกลบเรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`${UPDATE_DEPARTMENT_PATH}/${id}`);
  };

  // Filter departments based on search criteria
  const filteredDepartments = departments.filter(
    (department) =>
      department.departName.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchCode === "" ||
        department.departCode.toString().includes(searchCode))
  );

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  const paginatedDepartments = filteredDepartments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (error) {
    return (
      <Typography
        color="error"
        style={{ textAlign: "center", padding: "20px" }}
      >
        Error: {error}
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
      }}
      id="table-departments"
    >
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search by Department Name"
            variant="outlined"
            fullWidth
            value={searchName}
            onChange={handleSearchNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search by Department Code"
            variant="outlined"
            fullWidth
            value={searchCode}
            onChange={handleSearchCodeChange}
          />
        </Grid>
      </Grid>
      <FlexBetween>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={handleBulkDelete}
            disabled={selectedDepartments.length === 0}
            sx={{ marginBottom: "10px", padding: "8px 16px" }}
          >
            ลบที่เลือก
          </Button>
        </Box>
        <Box>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredDepartments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginBottom: "20px" }}
          />
        </Box>
      </FlexBetween>
      {filteredDepartments.length === 0 ? (
        <Typography
          color="textSecondary"
          style={{ textAlign: "center", padding: "20px" }}
        >
          No data found.
        </Typography>
      ) : (
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#1976D2" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedDepartments.length > 0 &&
                    selectedDepartments.length < filteredDepartments.length
                  }
                  checked={
                    filteredDepartments.length > 0 &&
                    selectedDepartments.length === filteredDepartments.length
                  }
                  onChange={(e) =>
                    setSelectedDepartments(
                      e.target.checked
                        ? filteredDepartments.map((department) => department.id)
                        : []
                    )
                  }
                  sx={{ color: "white" }}
                />
              </TableCell>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>ชื่่อสาขา</TableCell>
              <TableCell sx={{ color: "white" }}>รหัสสาขา</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDepartments.map((department) => (
              <TableRow
                key={department.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f9f9f9",
                  },
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDepartments.includes(department.id)}
                    onChange={() => handleSelectDepartment(department.id)}
                  />
                </TableCell>
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.departName}</TableCell>
                <TableCell>{department.departCode}</TableCell>
                <TableCell>
                  <Tooltip title="Update">
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdate(department.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DepartmentTable;
