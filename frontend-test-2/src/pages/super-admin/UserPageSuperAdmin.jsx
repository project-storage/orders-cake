import React from 'react'
import UserSuperAdmin from '../../components/views/super-admin/Table/users/UserSuperAdmin'
import CardUser from '../../components/views/super-admin/card/CardUser'
import { Box, Typography } from '@mui/material'
import CreateUser from '../../components/views/super-admin/Formes/user/CreateUser'

const UserPageSuperAdmin = () => {
    return (
        <Box>
            <Box sx={{ p: 2 }}>
                <Typography variant='h3' sx={{ fontWeight: 'bold' }}>User</Typography>
                <Typography >Super-Admin / <span style={{ color: '#2196f3' }}>User</span></Typography>
            </Box>
            <CardUser />
            <Box sx={{ m: 1 }}>
                <CreateUser />
            </Box>
            <UserSuperAdmin />
        </Box>
    )
}

export default UserPageSuperAdmin