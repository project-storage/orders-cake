import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Swal from "sweetalert2";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Button, Box, Stack } from "@mui/material";
import { renderToString } from "react-dom/server";


// Functions
function deleteCake(id) {
  Swal.fire({
    title: "คุณต้องการลบ " + id + " ใช่ไหม?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "เสร็จสิ้น",
        showConfirmButton: false,
        icon: "success",
        timer: 800,
      });
    }
  });
}

// Main Component
const TableCake = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  function createData(id, name, price) {
    return { id, name, price };
  }

  const handleAddProduct = () => {
    Swal.fire({
      title: "เพิ่มสินค้า",
      html: renderToString(<div></div>),
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // Validate input
        if (!productName || !productPrice) {
          Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน", "", "error");
          return;
        }

        // Add product to the list
        const newProduct = createData(
          rows.length + 1,
          productName,
          parseInt(productPrice)
        );
        setProductName("");
        setProductPrice("");
        rows.push(newProduct);
        Swal.fire("เพิ่มสินค้าเรียบร้อยแล้ว", "", "success");
      }
    });
  };

  const rows = [
    createData(1, "ช็อคโกแลต", 159),
    createData(2, "เนยสด", 237),
    createData(3, "นมเนย", 262),
    createData(4, "เเยม", 305),
    createData(5, "กาแฟ", 356),
  ];

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            height: 350,
            maxWidth: "100%",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1>จัดการเค้ก</h1>
            <Button
              sx={{ m: 3 }}
              color="success"
              variant="contained"
              startIcon={<InsertDriveFileIcon />}
              onClick={handleAddProduct}
            >
              เพิ่มสินค้า
            </Button>
          </Stack>

          <TableContainer sx={{ mt: 3 }} component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell width={50}>#</StyledTableCell>
                  <StyledTableCell width={300}>ชื่อ</StyledTableCell>
                  <StyledTableCell>ราคา</StyledTableCell>
                  <StyledTableCell colSpan={2}>ตัวจัดการ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
                    <StyledTableCell>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteCake(row.id)}
                        >
                          ลบ
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<BorderColorIcon />}
                        >
                          แก้ไข
                        </Button>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </>
  );
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "gray",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
export default TableCake;
