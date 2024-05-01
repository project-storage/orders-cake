import { Box, Grid } from "@mui/material";
import DataDegree from "../../../components/SuperAdmin/DataGrid/DataDegree";
import UpdateDegree from "../../../components/SuperAdmin/FormUpdate/UpdateDegree";
import React from "react";

const UpdateDegreeSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item md={6}>
          <DataDegree />
        </Grid>

        <Grid item md={6}>
          <UpdateDegree />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateDegreeSuper;
