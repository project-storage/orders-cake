import React from 'react'
import UpdateCake from '../../../../components/views/super-admin/Formes/cake/UpdateCake'
import CakeSuperAdmin from '../../../../components/views/super-admin/Table/cake/CakeSuperAdmin'
import { Box } from '@mui/material'

const UpdateCakePageSuperAdmin = () => {
    return (
        <Box>
            <UpdateCake />
            <Box sx={{mt:2}}>
                <CakeSuperAdmin />
            </Box>

        </Box>
    )
}

export default UpdateCakePageSuperAdmin