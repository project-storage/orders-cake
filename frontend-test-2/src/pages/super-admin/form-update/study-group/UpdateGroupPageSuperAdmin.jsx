import React from 'react'
import UpdateGroup from '../../../../components/views/super-admin/Formes/group/UpdateGroup'
import { Box } from '@mui/material'
import GroupSuperAdmin from '../../../../components/views/super-admin/Table/study-group/GroupSuperAdmin'

const UpdateGroupPageSuperAdmin = () => {
  return (
    <Box>
        <UpdateGroup/>
        <Box sx={{ mt: 2 }}>
          <GroupSuperAdmin/>
        </Box>
    </Box>
  )
}

export default UpdateGroupPageSuperAdmin