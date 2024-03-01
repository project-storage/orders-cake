import React, { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  ALL_DATA_USER_PATH,
  UPDATE_ADMIN_PATH,
} from "../../../config/constants";

const DataUserDetailsSuper = () => {
  const [userInfo, setUserInfo] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await UserService.getUserById(id);
      setUserInfo(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedUser(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handlePreVious = () => {
    navigate(ALL_DATA_USER_PATH);
  };

  const handleUpdate = async (id) => {
    navigate(`${UPDATE_ADMIN_PATH}/${id}`);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        {selectedUser && (
          <form>
            <Typography variant="h4" fontWeight="bold" mb="1rem">
              ข้อมูลส่วนตัว {selectedUser.title}
              {selectedUser.name} {selectedUser.surname}
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={2}>
                <Typography>คำนำหน้า</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={selectedUser.title}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={5}>
                <Typography>ชื่อ</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={5}>
                <Typography>นามสกุล</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={selectedUser.surname}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>เบอร์โทรศัพท์</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={selectedUser.telephone}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>สถานะผู้ใช้งาน</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Email</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>ชื่อผู้ใช้งาน</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  value={selectedUser.username}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  disabled
                />
              </Grid>
              <Button
                sx={{ m: 3 }}
                color="primary"
                variant="outlined"
                onClick={handlePreVious}
                type="button"
              >
                กลับไปหน้าข้อมูลผู้ใช้งาน
              </Button>
            </Grid>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default DataUserDetailsSuper;
