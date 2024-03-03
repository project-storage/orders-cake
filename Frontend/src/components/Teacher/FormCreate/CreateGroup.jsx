import {
  Autocomplete,
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
import UserService from "../../../services/UserService";

const CreateGroup = () => {
  const [roomName, setRoomName] = useState("");
  const [teachID, setTeachID] = useState("");
  const [departID, setDepartID] = useState("");
  const [degreeID, setDegreeID] = useState("");
  const [teachInfo, setTeachInfo] = useState(null);

  const [degrees, setDegrees] = useState([]);
  const [degreeSave, setDegreeSave] = useState("");

  const [departments, setDepartments] = useState([]);
  const [departmentSave, setDepartmentSave] = useState("");
  const [searchDepartments, setSearchDepartments] = useState("");
  const [departmentOption, setDepartmentOption] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState(null);
  const [error, setError] = useState("");

  const teachData = async () => {
    try {
      const res = await UserService.getUserInfo();
      setTeachInfo(res.data.data);
      setTeachID(res.data.data.id);
    } catch (error) {
      console.error("Error", error);
      setError(error);
    }
  };

  const fetchDegree = async () => {
    try {
      const res = await DegreeService.getAllDegree();
      setDegrees(res.data.data);
    } catch (error) {
      console.error("Error", error);
      setError(error);
    }
  };

  const fetchDepart = async () => {
    try {
      const res = await DepartmentService.getAllDepartment();
      setDepartments(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error", error);
      setError(error);
    }
  };

  // search dapartment
  const handleSearchDepartments = (e) => {
    setSearchDepartments(e.target.value);
    const filteredDepartments = departments.filter((department) =>
      department.departName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDepartmentOption(
      filteredDepartments.map((department) => department.departName)
    );
  };

  const handleDepartmentsSelect = (e, value) => {
    setSearchDepartments(value);
    const selectedDepartmentId = departments.find(
      (department) => department.departName === value
    )?.id;
    setDepartID(selectedDepartmentId);
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
    fetchDegree();
    fetchDepart();
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
              <Select
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                onChange={(e) => setDegreeID(e.target.value)}
              >
                {degrees.map((degree) => (
                  <MenuItem key={degree.id} value={degree.id}>
                    {degree.degreeName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={6}>
              <Typography>ห้องเรียน</Typography>
              <Select
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              >
                <MenuItem value={"ห้อง.1"}>ห้อง 1</MenuItem>
                <MenuItem value={"ห้อง.2"}>ห้อง 2</MenuItem>
                <MenuItem value={"ห้อง.3"}>ห้อง 3</MenuItem>
                <MenuItem value={"ห้อง.4"}>ห้อง 4</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                fullWidth
                margin="normal"
                options={departmentOption}
                value={selectedDepartments}
                onChange={handleDepartmentsSelect}
                onInputChange={handleSearchDepartments}
                renderInput={(params) => (
                  <TextField {...params} label="แผนก" variant="outlined" />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                disabled
                label="ครูที่ปรึกษา"
                variant="outlined"
                onChange={(e) => setTeachID(e.target.value)}
                value={
                  teachInfo
                    ? `${teachInfo.title}${teachInfo.name} ${teachInfo.surname}`
                    : ""
                } // แสดงชื่อครูที่ปรึกษา
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
