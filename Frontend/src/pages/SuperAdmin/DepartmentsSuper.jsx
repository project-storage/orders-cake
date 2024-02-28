import { Box, Grid } from '@mui/material'
import React from "react";
import CreateDepartMent from '../../components/SuperAdmin/FormCreate/createDepartMent';
import DataDepartments from '../../components/SuperAdmin/DataGride/DataDepartments';

const DepartmentsSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12}>
          <DataDepartments />
        </Grid>

        <Grid item xs={12}>
          <CreateDepartMent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DepartmentsSuper;
