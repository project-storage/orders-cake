import { Box, Grid } from "@mui/material";
import DataAllUser from "../../components/SuperAdmin/DataGrid/DataAllUser";
import React from "react";

const AllUserSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12}>
          <DataAllUser />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AllUserSuper;
