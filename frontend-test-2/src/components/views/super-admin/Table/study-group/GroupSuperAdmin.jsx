import React, { useEffect, useState } from 'react'
import GroupService from '../../../../../services/GroupService'
import DepartmentService from '../../../../../services/DepartmentService'
import DegreeService from '../../../../../services/DegreeService'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import UserService from '../../../../../services/UserService'

const GroupSuperAdmin = () => {
  const [groups, setGroups] = useState([])
  const [departs, setDeparts] = useState([])
  const [degrees, setDegrees] = useState([])
  const [techers, setTechers] = useState([])
  const [error, setError] = useState("")

  const fetchData = async () => {
    try {
      const resGroup = await GroupService.getAll()
      const resDepart = await DepartmentService.getAll()
      const resDegree = await DegreeService.getAll()
      const resTecher = await UserService.getAllUser()

      setGroups(resGroup.data.data)
      setDeparts(resDepart.data.data)
      setDegrees(resDegree.data.data)
      setTechers(resTecher.data.data)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'departID',
      headerName: 'แผนก',
      width: 110,
      editable: true,
      valueGetter: (params) => {
        const department = departs.find(department => department.id === params.value);
        return department ? department.departName : '';
      }
    },
    {
      field: 'degreeID',
      headerName: 'ระดับชั้น',
      sortable: false,
      width: 160,
      valueGetter: (params) => {
        const degree = degrees.find(degree => degree.id === params.value);
        return degree ? degree.degreeName : '';
      }
    },
    {
      field: 'roomName',
      headerName: 'ห้อง',
      width: 150,
      editable: true,
    },
    {
      field: 'teachID',
      headerName: 'ครูที่ปรึกษา',
      width: 150,
      editable: true,
      valueGetter: (params) => {
        const teacher = techers.find(teacher => teacher.id === params.value);
        return teacher ? `${teacher.title} ${teacher.name} ${teacher.surname}` : '';
      }
    },
  ];


  return (
    <Box sx={{ height: 400, width: '100%' }}>
     
      <DataGrid
        rows={groups}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default GroupSuperAdmin