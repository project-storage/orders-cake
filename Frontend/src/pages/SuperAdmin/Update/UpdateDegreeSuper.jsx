import { Box, Grid } from '@mui/material'
import DataDegree from '../../../components/SuperAdmin/DataGride/DataDegree'
import UpdateDegree from '../../../components/SuperAdmin/FormUpdate/UpdateDegree'
import React from 'react'

const UpdateDegreeSuper = () => {
  return (
    <Box>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
      <Grid item xs={12}>
        <DataDegree />
      </Grid>

      <Grid item xs={12}>
        <UpdateDegree />
      </Grid>
    </Grid>
  </Box>
  )
}

export default UpdateDegreeSuper