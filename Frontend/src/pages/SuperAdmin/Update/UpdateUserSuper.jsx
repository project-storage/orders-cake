import { Box, Grid } from "@mui/material";
import DataUserDetailsSuper from "../../../components/SuperAdmin/DataDetails/DataUserDetailsSuper";
import UpdateUser from "../../../components/SuperAdmin/FormUpdate/UpdateUser";
import React from "react";

const UpdateUserSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12}>
          <UpdateUser />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateUserSuper;
