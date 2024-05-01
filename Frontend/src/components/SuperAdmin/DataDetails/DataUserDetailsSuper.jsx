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

  return (
    <Box m="1.5rem 2.5rem">
      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent>
          {selectedUser && (
            <form>
              <Typography variant="h4" fontWeight="bold" mb="1rem">
                ข้อมูลส่วนตัว
              </Typography>
              <Typography variant="h6">
                ชื่อ-นามสกุล : {selectedUser.title}
                {selectedUser.name} {selectedUser.surname}
              </Typography>

              <Typography variant="h6">
                เบอร์โทรศัพท์ : {selectedUser.telephone}
              </Typography>

              <Typography variant="h6">
                อีเมลล์ : {selectedUser.email}
              </Typography>
              <Typography variant="h6">
                ชื่อผู้ใช้งาน : {selectedUser.username}
              </Typography>
              <Typography variant="h6">
                สถานะผู้ใช้งาน : {selectedUser.role}
              </Typography>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DataUserDetailsSuper;
