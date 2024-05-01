import { Box, Grid } from '@mui/material'
import DataDepartments from '../../../components/SuperAdmin/DataGrid/DataDepartments'
import React from 'react'
import UpdateDepartment from '../../../components/SuperAdmin/FormUpdate/UpdateDepartment'

const UpdateDepartmentSuper = () => {
  return (
    <Box>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
      <Grid item xs={12}>
        <DataDepartments />
      </Grid>

      <Grid item xs={12}>
        <UpdateDepartment />
      </Grid>
    </Grid>
  </Box>
  )
}

export default UpdateDepartmentSuper