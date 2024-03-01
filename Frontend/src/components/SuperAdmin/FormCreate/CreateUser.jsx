import React, { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ALL_DATA_USER_PATH } from "../../../config/constants";

const CreateUser = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, setCreateUser] = useState({});
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqData = {
        title: title,
        name: name,
        surname: surname,
        telephone: telephone,
        role: role,
        email: email,
        username: username,
        password: password,
      };

      const response = await UserService.createUser(reqData);

      if (response.status === 200) {
        Swal.fire("เพิ่มผู้ใช้งานสำเร็จ", "", "success");
        console.log(response.data.data);
        setCreateUser(response.data.data);
        setUserId(response.data.data);
        navigate(ALL_DATA_USER_PATH);
      } else {
        Swal.fire("กรุณากรอกข้อมูลให้ครบ", "", "info");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCancelClick = () => {
    navigate(ALL_DATA_USER_PATH);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setRole(value);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            อัพเดทข้อมูลส่วนตัว
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={2}>
              <InputLabel sx={{ mb: 2 }}>คำนำหน้า*:</InputLabel>
              <Select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              >
                <MenuItem value="" disabled>
                  --------------เลือกคำนำหน้า--------------
                </MenuItem>
                <MenuItem value="นาย">นาย</MenuItem>
                <MenuItem value="นาง">นาง</MenuItem>
                <MenuItem value="น.ส.">น.ส.</MenuItem>
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={5}>
              <Typography>ชื่อ</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography>นามสกุล</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>เบอร์โทรศัพท์</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel sx={{ mb: 2 }}>สถานะผู้ใช้งาน</InputLabel>
              <Select
                value={role}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="" disabled>
                  --------------สถานะผู้ใช้งาน--------------
                </MenuItem>
                <MenuItem value="Admin">ผู้ดูระบบ</MenuItem>
                <MenuItem value="ฝ่ายจ่ายเค้ก">ฝ่ายจ่ายเค้ก</MenuItem>
                <MenuItem value="ฝ่ายการเงิน">ฝ่ายการเงิน</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Typography>Email</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>ชื่อผู้ใช้งาน</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>รหัสผ่าน</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Button
              sx={{ m: 3 }}
              color="success"
              variant="outlined"
              type="submit"
            >
              ยืนยัน
            </Button>
            <Button
              sx={{ m: 3 }}
              color="error"
              variant="outlined"
              onClick={handleCancelClick}
              type="button"
            >
              ยกเลิก
            </Button>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateUser;
