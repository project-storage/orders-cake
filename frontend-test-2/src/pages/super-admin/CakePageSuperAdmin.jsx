import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import CakeSuperAdmin from '../../components/views/super-admin/Table/cake/CakeSuperAdmin'
import CreateCake from '../../components/views/super-admin/Formes/cake/CreateCake'
const CakePageSuperAdmin = () => {
    return (
        <Box>
            <Box sx={{ p: 2 }}>
                <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Cake</Typography>
                <Typography >Super-Admin / <span style={{ color: '#2196f3' }}>Cake</span></Typography>
            </Box>
            <CakeSuperAdmin />
            <CreateCake />

        </Box>
    )
}

export default CakePageSuperAdmin