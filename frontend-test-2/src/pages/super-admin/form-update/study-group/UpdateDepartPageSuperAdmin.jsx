import React from 'react'
import DepartSuperAdmin from '../../../../components/views/super-admin/Table/study-group/DepartSuperAdmin'
import UpdateDepartSuperAdmin from '../../../../components/views/super-admin/Formes/department/UpdateDepartSuperAdmin'
import { Box } from '@mui/material'

const UpdateDepartPageSuperAdmin = () => {
  return (
    <Box>
      <UpdateDepartSuperAdmin />
      <Box sx={{ mt: 2 }}>
        <DepartSuperAdmin />
      </Box>
    </Box>
  )
}

export default UpdateDepartPageSuperAdmin