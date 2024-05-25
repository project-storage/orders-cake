import { Box, Button, Grid, TextField, Typography, FormControl, InputLabel, Autocomplete, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { groupById, updateGroup } from '../../../../../slices/groupSlice'
import { fetchDepartments } from '../../../../../slices/departmentSlice'
import { fetchDegrees } from '../../../../../slices/degreeSlice'
import { fetchUseTeacher } from '../../../../../slices/userSlice'
import Swal from 'sweetalert2'
import { GROUP_PATH } from '../../../../../configs/constrants'

const UpdateGroup = () => {
  const [roomName, setRoomName] = useState("")
  const [teachID, setTeachID] = useState("")
  const [departID, setDepartID] = useState("")
  const [degreeID, setDegreeID] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const { group, loading, error: fetchError } = useSelector((state) => state.groups)
  const { departments } = useSelector((state) => state.departments)
  const { degrees } = useSelector((state) => state.degrees)
  const { users: teachers } = useSelector((state) => state.users)

  const roomOptions = ["ห้อง 1", "ห้อง 2", "ห้อง 3", "ห้อง 4"] // แก้ตรงนี้เป็นชื่อห้องที่ถูกต้อง

  useEffect(() => {
    if (id) {
      dispatch(groupById(id))
    }
    dispatch(fetchDepartments())
    dispatch(fetchDegrees())
    dispatch(fetchUseTeacher())
  }, [id, dispatch])

  useEffect(() => {
    if (group) {
      setRoomName(group.roomName)
      setTeachID(group.teachID)
      setDepartID(group.departID)
      setDegreeID(group.degreeID)
    }
  }, [group])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await dispatch(updateGroup({ id, roomName, teachID, departID, degreeID }))
      if (res.payload) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "อัพเดทข้อมูลสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      setError("Failed to update group")
    }
  }

  const handleCancelClick = () => {
    navigate(GROUP_PATH)
  }

  return (
    <Box className="update-group" sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" fontWeight="bold" mb="1rem">
          อัพเดทข้อมูล
        </Typography>
        {fetchError && <Typography color="error">{fetchError}</Typography>}
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item md={6} xs={12}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="degreeID-label">ระดับชั้น</InputLabel>
              <Select
                required
                labelId="degreeID-label"
                id="degreeID"
                name="degreeID"
                label="ระดับชั้น"
                value={degreeID}
                onChange={(e) => setDegreeID(e.target.value)}
              >
                {degrees.map((degree) => (
                  <MenuItem key={degree.id} value={degree.id}>
                    {degree.degreeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <Autocomplete
              options={roomOptions}
              getOptionLabel={(option) => option}
              value={roomName}
              onChange={(event, newValue) => {
                setRoomName(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} label="ห้องเรียน" variant="outlined" margin="dense" required />
              )}
              freeSolo
              autoSelect
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Select
              fullWidth
              required
              labelId="departID-label"
              id="departID"
              name="departID"
              label="แผนก"
              value={departID}
              onChange={(e) => setDepartID(e.target.value)}
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.departName}
                </MenuItem>
              ))}
            </Select>

          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="teachID-label">ครูที่ปรึกษา</InputLabel>
              <Select
                required
                labelId="teachID-label"
                id="teachID"
                name="teachID"
                label="ครูที่ปรึกษา"
                value={teachID}
                onChange={(e) => setTeachID(e.target.value)}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {`${teacher.title}${teacher.name} ${teacher.surname}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <Button
              color="success"
              variant="contained"
              type="submit"
            >
              อัพเดทข้อมูล
            </Button>
            <Button
              sx={{ ml: 1 }}
              color="error"
              variant="contained"
              onClick={handleCancelClick}
            >
              ยกเลิก
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default UpdateGroup
