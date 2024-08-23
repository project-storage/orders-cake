import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { fetchCakes, deleteCake } from "../../../../slices/cakeSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TableSortLabel,
  IconButton,
  Tooltip,
  TablePagination,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { UPDATE_CAKEA_PATH } from "../../../../configs/constants";
import { useNavigate } from "react-router-dom";

const CakeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cakes, loading, error } = useSelector(
    (state: RootState) => state.cakes
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  useEffect(() => {
    dispatch(fetchCakes());
  }, [dispatch]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchName(event.target.value);
    setPage(0);
  };

  const handleSearchPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchPrice(event.target.value);
    setPage(0);
  };

  const handleDelete = async (id: string) => {
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
        await dispatch(deleteCake(id));
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
      console.error("Error deleting cake:", error);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลเค้กได้", "error");
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`${UPDATE_CAKEA_PATH}/${id}`);
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

  // Filter cakes based on search criteria
  const filteredCakes = cakes.filter(
    (cake) =>
      cake.cakeName.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchPrice === "" || cake.price.toString().includes(searchPrice))
  );

  const paginatedCakes = filteredCakes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "20px", padding: "20px" }}
      id="table-cakes"
    >
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Cake Name"
            variant="outlined"
            fullWidth
            value={searchName}
            onChange={handleSearchNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Price"
            variant="outlined"
            fullWidth
            value={searchPrice}
            onChange={handleSearchPriceChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredCakes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginBottom: "20px" }}
          />
        </Grid>
      </Grid>
      {filteredCakes.length === 0 ? (
        <Typography
          color="textSecondary"
          style={{ textAlign: "center", padding: "20px" }}
        >
          No data found.
        </Typography>
      ) : (
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>ID</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Cake Name</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Price</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Action</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCakes.map((cake) => (
              <TableRow
                key={cake.id || cake.cakeName} // Ensure the key is unique
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f5f5f5",
                  },
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <TableCell>{cake.id}</TableCell>
                <TableCell>{cake.cakeName}</TableCell>
                <TableCell>${cake.price}</TableCell>
                <TableCell>
                  <Tooltip title="Update">
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdate(cake.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(cake.id)}
                    >
                      <DeleteIcon />
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

export default CakeTable;
