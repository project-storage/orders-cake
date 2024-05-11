import React from 'react'
import DepartSuperAdmin from '../../../components/views/super-admin/Table/study-group/DepartSuperAdmin'
import { Box, Typography } from '@mui/material'
import CreateDepartSuperAdmin from '../../../components/views/super-admin/Formes/department/CreateDepartSuperAdmin'

const DepartPageSuperAdmin = () => {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Department</Typography>
        <Typography >Super-Admin / <span style={{ color: '#2196f3' }}>Department</span></Typography>
      </Box>
      <Box sx={{m:1}}>
        <CreateDepartSuperAdmin />
      </Box>
      <DepartSuperAdmin />
    </Box>
  )
}

export default DepartPageSuperAdmin