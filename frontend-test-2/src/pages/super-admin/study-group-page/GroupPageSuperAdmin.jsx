import React from 'react'
import GroupSuperAdmin from '../../../components/views/super-admin/Table/study-group/GroupSuperAdmin'
import { Box, Typography } from '@mui/material'
import CreateGroup from '../../../components/views/super-admin/Formes/group/CreateGroup'

const GroupPageSuperAdmin = () => {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Group</Typography>
        <Typography >Super-Admin / <span style={{ color: '#2196f3' }}>Group</span></Typography>
      </Box>
      <Box sx={{ m: 1 }}>
        <CreateGroup />
      </Box>
      <GroupSuperAdmin />
    </Box>
  )
}

export default GroupPageSuperAdmin