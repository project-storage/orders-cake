import React from 'react'
import DegreeSuperAdmin from '../../../components/views/super-admin/Table/study-group/DegreeSuperAdmin'
import { Box, Grid, Typography } from '@mui/material'
import CreateDegree from '../../../components/views/super-admin/Formes/degree/CreateDegree'

const DegreePageSuperAdmin = () => {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Degree</Typography>
        <Typography >Super-Admin / <span style={{ color: '#2196f3' }}>Degree</span></Typography>
      </Box>
          <DegreeSuperAdmin />
          <CreateDegree />
    </Box>
  )
}

export default DegreePageSuperAdmin