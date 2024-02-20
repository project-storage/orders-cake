import { Box } from '@mui/material'
import DataDepartments from '../../components/SuperAdmin/DataGride/DataDepartments'
import React from 'react'
import DepartmentCard from '../../components/SuperAdmin/DepartmentCard'

const DepartmentsSuper = () => {
  return (
    <Box>
        <DataDepartments/>
        <DepartmentCard/>
    </Box>
  )
}

export default DepartmentsSuper