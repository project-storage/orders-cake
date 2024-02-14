import {  Button, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";


const currencies = [
  {
    value: "นาย",
    label: "นาย",
  },
  {
    value: "นางสาว",
    label: "นางสาว",
  },
  {
    value: "นาง",
    label: "นาง",
  },
];
const EditAdmin = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-select-currency"
            select
            label="คำนำหน้า"
            fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-multiline-flexible"
            label="ชื่อ"
            multiline
            defaultValue="กฤษณชัย"
            maxRows={4}
            fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-multiline-flexible"
            label="นามสกุล"
            defaultValue="อุลทิพย์"
            multiline
            maxRows={4}
            fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
          />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField
            id="outlined-multiline-flexible"
            label="ชื่อผู้ใช้งาน"
            defaultValue="kritsanachai"
            multiline
            maxRows={4}
            fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
          />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField
            id="outlined-multiline-flexible"
            label="อีเมล"
            defaultValue="kritsanachai@gmail.com"
            multiline
            maxRows={4}
            fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
          />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField
            id="outlined-multiline-flexible"
            label="เบอร์โทร"
            defaultValue="0987654321"
            multiline
            maxRows={4}
            fullWidth // ทำให้ TextField ขยายตามขนาดของ Grid item
          />
        </Grid>
        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ยืนยัน
              </Button>
      </Grid>
    </>
  );
};

export default EditAdmin;
