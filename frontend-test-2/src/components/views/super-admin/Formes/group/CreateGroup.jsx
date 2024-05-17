import React, { useEffect, useState } from 'react'
import GroupService from '../../../../../services/GroupService'
import DegreeService from '../../../../../services/DegreeService'
import DepartmentService from '../../../../../services/DepartmentService'
import UserService from '../../../../../services/UserService'
import Swal from 'sweetalert2'
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Select, TextField } from '@mui/material'

const CreateGroup = () => {
    const [roomName, setRoomName] = useState("");
    const [teachID, setTeachID] = useState("");
    const [departID, setDepartID] = useState("");
    const [degreeID, setDegreeID] = useState("");
    const [error, setError] = useState("");
    const [createdGroup, setCreatedGroup] = useState(false)
    const [open, setOpen] = useState(false);

    const [degrees, setDegrees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [searchDepartments, setSearchDepartments] = useState("");
    const [departmentOption, setDepartmentOption] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState(null);

    const [searchTeachers, setSearchTeachers] = useState("");
    const [teacherOption, setTeacherOption] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState(null);

    const fetchTeacher = async () => {
        try {
            const res = await UserService.getUseTeacher()
            setTeachers(res.data.data);
        } catch (error) {
            console.error("Error", error);
            setError(error);
        }
    };

    const fetchDegree = async () => {
        try {
            const res = await DegreeService.getAll()
            setDegrees(res.data.data);
        } catch (error) {
            console.error("Error", error);
            setError(error);
        }
    };

    const fetchDepart = async () => {
        try {
            const res = await DepartmentService.getAll()
            setDepartments(res.data.data);
        } catch (error) {
            console.error("Error", error);
            setError(error);
        }
    };

    // search department
    const handleSearchDepartments = (e) => {
        setSearchDepartments(e.target.value);
        const filteredDepartments = departments.filter((department) =>
            department.departName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setDepartmentOption(filteredDepartments.map((department) => department.departName));
    };

    const handleDepartmentsSelect = (e, value) => {
        setSearchDepartments(value);
        const selectedDepartmentId = departments.find((department) => department.departName === value)?.id;
        setDepartID(selectedDepartmentId);
    };

    // search teacher
    const handleSearchTeachers = (e) => {
        setSearchTeachers(e.target.value);
        const filteredTeachers = teachers.filter((teacher) =>
            `${teacher.title} ${teacher.name} ${teacher.surname}`.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setTeacherOption(filteredTeachers.map((teacher) => `${teacher.title}${teacher.name} ${teacher.surname}`));
    };

    const handleTeacherSelect = (e, value) => {
        setSearchTeachers(value);
        const selectedTeacherId = teachers.find((teacher) => `${teacher.title}${teacher.name} ${teacher.surname}` === value)?.id;
        setTeachID(selectedTeacherId);
    };

    useEffect(() => {
        fetchTeacher();
        fetchDegree();
        fetchDepart();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const create = await GroupService.create({
                roomName: roomName,
                teachID: teachID,
                departID: departID,
                degreeID: degreeID,
            });

            if (create.status === 201) {
                setCreatedGroup(true);
                setOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "สร้างข้อมูลสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error creating data: ", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (createdGroup) {
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    }, [createdGroup]);

    return (
        <Box className="form-create-group">
            <Button variant="contained" onClick={handleClickOpen}>
                สร้างข้อมูล
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>สร้างข้อมูลสาขา</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid item md={6} xs={12}>
                                <Select
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="degree"
                                    name="degree"
                                    label="ระดับชั้น"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={degreeID}
                                    onChange={(e) => setDegreeID(e.target.value)}
                                >
                                    {degrees.map((degree) => (
                                        <MenuItem key={degree.id} value={degree.id}>
                                            {degree.degreeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Select
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="roomName"
                                    name="roomName"
                                    label="ห้อง"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                >
                                    <MenuItem value={"ห้อง.1"}>ห้อง 1</MenuItem>
                                    <MenuItem value={"ห้อง.2"}>ห้อง 2</MenuItem>
                                    <MenuItem value={"ห้อง.3"}>ห้อง 3</MenuItem>
                                    <MenuItem value={"ห้อง.4"}>ห้อง 4</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Autocomplete
                                    autoFocus
                                    required
                                    freeSolo
                                    autoSelect
                                    margin="dense"
                                    id="departID"
                                    name="departID"
                                    type="text"
                                    fullWidth
                                    options={departmentOption}
                                    value={selectedDepartments}
                                    onChange={(e, value) => handleDepartmentsSelect(e, value)}
                                    onInputChange={handleSearchDepartments}
                                    renderInput={(params) => (
                                        <TextField {...params} label="แผนก" variant="standard" />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Autocomplete
                                    autoFocus
                                    required
                                    freeSolo
                                    autoSelect
                                    margin="dense"
                                    id="teachID"
                                    name="teachID"
                                    type="text"
                                    fullWidth
                                    options={teacherOption}
                                    value={selectedTeachers}
                                    onChange={(e, value) => handleTeacherSelect(e, value)}
                                    onInputChange={handleSearchTeachers}
                                    renderInput={(params) => (
                                        <TextField {...params} label="ครูที่ปรึกษา" variant="standard" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color='error'>ยกเลิก</Button>
                    <Button type="submit" onClick={handleSubmit} color='success' variant="contained">ยืนยัน</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default CreateGroup
