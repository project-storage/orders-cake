import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import TeacherService from "../../services/TeacherService";

const ProfileTeach = () => {
  const [proFile, setProFile] = useState({});
  const [editedProfile, setEditedProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    const res = await UserService.getUserInfo();
    setProFile(res.data.data);
    console.log(setProFile);
    try {
    } catch (error) {
      console.error("Error Fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await UserService.updateUser(editedProfile);
      await fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <Typography variant="h4" fontWeight="bold" mb="1rem">
          ข้อมูลส่วนตัว
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography>ชื่อ</Typography>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              value={isEditing ? editedProfile.name : proFile.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>นามสกุล</Typography>
            <TextField
              fullWidth
              margin="normal"
              value={isEditing ? editedProfile.surname : proFile.surname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>เบอร์โทร</Typography>
            <TextField
              fullWidth
              margin="normal"
              value={isEditing ? editedProfile.telephone : proFile.telephone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>อีเมลล์</Typography>
            <TextField
              fullWidth
              margin="normal"
              value={isEditing ? editedProfile.email : proFile.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>รหัสผ่าน</Typography>
            <TextField fullWidth margin="normal" onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            {isEditing ? (
              <Button onClick={handleSave} variant="contained" color="primary">
                บันทึก
              </Button>
            ) : (
              <Button onClick={handleEdit} variant="outlined" color="primary">
                แก้ไข
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileTeach;
