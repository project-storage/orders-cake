import { Box, Grid } from "@mui/material";
import UpdateCake from "../../../components/SuperAdmin/FormUpdate/UpdateCake";
import React from "react";
import DataCake from "../../../components/SuperAdmin/DataGrid/DataCake";

const UpdateCakeSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12}>
          <DataCake />
        </Grid>

        <Grid item xs={12}>
          <UpdateCake />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateCakeSuper;
