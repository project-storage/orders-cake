import { Box, Grid } from '@mui/material'
import React from "react";
import DataGroup from '../../components/Teacher/DataGrid/DataGroup';
import CreateGroup from '../../components/Teacher/FormCreate/CreateGroup';

const GroupTeach = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12}>
          <DataGroup />
        </Grid>

        <Grid item xs={12}>
          <CreateGroup />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroupTeach;
