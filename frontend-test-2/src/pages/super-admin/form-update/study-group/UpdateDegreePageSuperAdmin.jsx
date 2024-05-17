import React from 'react'
import UpdateDegree from '../../../../components/views/super-admin/Formes/degree/UpdateDegree'
import DegreeSuperAdmin from '../../../../components/views/super-admin/Table/study-group/DegreeSuperAdmin'
import { Box, Grid } from '@mui/material'

const UpdateDegreePageSuperAdmin = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item md={3} xs={12}>
          <UpdateDegree />
        </Grid>
        <Grid item md={9} xs={12}>
          <DegreeSuperAdmin />
        </Grid>
      </Grid>


    </Box>
  )
}

export default UpdateDegreePageSuperAdmin