import { Box, Grid } from "@mui/material";
import React from "react";
import DataDegree from "../../components/SuperAdmin/DataGride/DataDegree";
import CreateDegree from "../../components/SuperAdmin/FormCreate/CreateDegree";

const DegreeSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12} sm={12}>
          <DataDegree />
        </Grid>

        <Grid item xs={12} sm={12}>
          <CreateDegree />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DegreeSuper;
