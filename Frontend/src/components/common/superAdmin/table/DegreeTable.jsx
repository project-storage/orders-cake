import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDegree, fetchDegrees } from "../../../../slices/degreeSlice";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Checkbox,
  Tooltip,
  IconButton,
} from "@mui/material";
import FlexBetween from "../../../../configs/FlexBetween";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate
import { UPDATE_DEGREE_PATH } from "../../../../configs/constants";

const DegreeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // สร้าง navigate
  const { degrees, loading, error } = useSelector(
    (state) => state.degrees
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDegrees, setSelectedDegrees] = useState([]);

  useEffect(() => {
    dispatch(fetchDegrees());
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

  const handleSelectDegree = (id) => {
    setSelectedDegrees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((degreeId) => degreeId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedDegrees.length === 0) {
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
          selectedDegrees.map((id) => dispatch(deleteDegree(id)))
        );
        setSelectedDegrees([]);
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

  const handleNavigateToUpdate = (id) => {
    navigate(`${UPDATE_DEGREE_PATH}/${id}`);
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

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

  const paginatedDegrees = degrees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FlexBetween>
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleBulkDelete}
              disabled={selectedDegrees.length === 0}
              sx={{ marginBottom: "10px", padding: "8px 16px" }}
            >
              ลบที่เลือก
            </Button>
          </Box>
          <Box>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={degrees.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ marginBottom: "20px" }}
            />
          </Box>
        </FlexBetween>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#1976D2" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedDegrees.length > 0 &&
                    selectedDegrees.length < degrees.length
                  }
                  checked={
                    degrees.length > 0 &&
                    selectedDegrees.length === degrees.length
                  }
                  onChange={(e) =>
                    setSelectedDegrees(
                      e.target.checked ? degrees.map((degree) => degree.id) : []
                    )
                  }
                />
              </TableCell>
              <TableCell sx={{ color: "white" }}>#</TableCell>
              <TableCell sx={{ color: "white" }}>ชื่อแผนก</TableCell>
              <TableCell sx={{ color: "white" }}>การดำเนินการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDegrees.map((degree) => (
              <TableRow
                key={degree.id}
                selected={selectedDegrees.includes(degree.id)}
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
                    checked={selectedDegrees.includes(degree.id)}
                    onChange={() => handleSelectDegree(degree.id)}
                  />
                </TableCell>
                <TableCell>{degree.id}</TableCell>
                <TableCell>{degree.degreeName}</TableCell>
                <TableCell>
                  <Tooltip title="Update">
                    <IconButton
                      color="primary"
                      onClick={() => handleNavigateToUpdate(degree.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DegreeTable;
