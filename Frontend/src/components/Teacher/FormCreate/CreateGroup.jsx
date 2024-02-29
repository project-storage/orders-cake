import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GroupService from "../../../services/GroupService";
import TeacherService from "../../../services/TeacherService";
import DegreeService from "../../../services/DegreeService";
import DepartmentService from "../../../services/DepartmentService";

const CreateGroup = () => {
  const [roomName, setRoomName] = useState("");
  const [teachID, setTeachID] = useState("");
  const [departID, setDepartID] = useState("");
  const [degreeID, setDegreeID] = useState("");
  const [teachInfo, setTeachInfo] = useState([]);
  const [error, setError] = useState("");

  const teachData = async () => {
    try {
      const res = await TeacherService.getTeacherInfo();
      setTeachInfo(res.data.data);
    } catch (error) {
      console.error("Error", error);
      setError(error);
    }
  };

  const fetchDegree = async () => {
    try {
      const res = await DegreeService.getAllDegree();
      setDegreeID(res.data.data);
    } catch (error) {
      console.error("Error", error);
      setError(error);
    }
  };

  const fetchDepart = async () => {
    try {
      const res = await DepartmentService.getAllDepartment();
      setDepartID(res.data.data);
    } catch (error) {
      console.error("Error", error);
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await GroupService.createGroup({
        roomName: roomName,
        teachID: teachID,
        departID: departID,
        degreeID: degreeID,
      });
      if (res.status === 200) {
        window.location.reload();
      }
      console.log(res.data.cake);
    } catch (error) {
      console.error("Error:", error.res);
      setError(error);
    }
  };

  useEffect(() => {
    teachData();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold" mb="1rem">
            เพิ่มข้อมูลห้องเรียน
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Typography>ระดับชั้น</Typography>
              <TextField fullWidth margin="normal" />
            </Grid>

            <Grid item xs={6}>
              <Typography>ห้องเรียน</Typography>
              <Select fullWidth margin="normal" sx={{ mt: 2 }}>
                <MenuItem value={"1"}>ห้อง 1</MenuItem>
                <MenuItem value={"2"}>ห้อง 2</MenuItem>
                <MenuItem value={"3"}>ห้อง 3</MenuItem>
                <MenuItem value={"4"}>ห้อง 4</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={6}>
              <Typography>แผนก</Typography>
              <TextField fullWidth margin="normal" />
            </Grid>

            <Grid item xs={6}>
              <Typography>ครูที่ปรึกษา</Typography>
              <TextField
                fullWidth
                margin="normal"
                disabled
                value={`${teachInfo.title}${teachInfo.name} ${teachInfo.surname}`}
              />
            </Grid>

            <Button
              sx={{ m: 3 }}
              color="success"
              variant="contained"
              type="submit"
            >
              เพิ่มข้อมูลเค้ก
            </Button>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateGroup;
