import React, { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { ALL_DATA_USER_PATH } from "../../../config/constants";
import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const UpdateUser = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await UserService.getUserById(id);
      if (response.status === 200) {
        setTitle(response.data.data[0].title);
        setName(response.data.data[0].name);
        setSurname(response.data.data[0].surname);
        setTelephone(response.data.data[0].telephone);
        setRole(response.data.data[0].role);
        setEmail(response.data.data[0].email);
        setUsername(response.data.data[0].username);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(fetchData());
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.updateUser(id, {
        title: title,
        name: name,
        surname: surname,
        telephone: telephone,
        role: role,
        email: email,
        username: username,
      });
      if (response.status === 200) {
        navigate(ALL_DATA_USER_PATH);
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error);
    }
  };

  const handleCancelClick = () => {
    navigate(ALL_DATA_USER_PATH);
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
              <Typography>สถานะผู้ใช้งาน</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled
              />
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
                disabled
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

export default UpdateUser;
