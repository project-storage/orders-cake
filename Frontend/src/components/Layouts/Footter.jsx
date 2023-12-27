import { Box } from '@mui/material'
import React from 'react'
import { FOOTTER } from '../../config/constants'

const Footter = () => {
  return (
    <Box sx={{fontSize:'12px'}}>&#169; {FOOTTER}</Box>
  )
}

export default Footter