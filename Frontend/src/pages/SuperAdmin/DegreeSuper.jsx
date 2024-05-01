import { Box, Grid } from "@mui/material";
import React from "react";
import DataDegree from "../../components/SuperAdmin/DataGrid/DataDegree";
import CreateDegree from "../../components/SuperAdmin/FormCreate/CreateDegree";

const DegreeSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item md={6}>
          <DataDegree />
        </Grid>

        <Grid item md={6}>
          <CreateDegree />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DegreeSuper;
