import React, { useEffect } from 'react'
import UpdateUser from '../../../../components/views/super-admin/Formes/user/UpdateUser'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserById } from '../../../../slices/userSlice'
import UserSuperAdmin from '../../../../components/views/super-admin/Table/users/UserSuperAdmin'

const UpdateUserPageSuperAdmin = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user, loading, error: fetchError } = useSelector((state) => state.users)

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id))
        }
    }, [id, dispatch])


    return (
        <Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                    อัพเดทข้อมูล
                </Typography>
                <Typography >
                    Super-Admin / <span style={{ color: '#2196f3' }}>update</span>/
                    <span style={{ color: '#018CF6' }}>
                        {user ? ` ${user.title} ${user.name} ${user.surname}` : ''}
                    </span>
                </Typography>
            </Box>
            <Box sx={{m:1}}>
                <UpdateUser />
            </Box>
            <UserSuperAdmin />
        </Box>
    )
}

export default UpdateUserPageSuperAdmin