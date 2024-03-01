import { Box } from "@mui/system";
import DataUserDetailsSuper from "../../../components/SuperAdmin/DataDetails/DataUserDetailsSuper";
import React from "react";
import UpdateUser from "../../../components/SuperAdmin/FormUpdate/UpdateUser";
import { Grid } from "@mui/material";

const UserDetailSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12}>
          <DataUserDetailsSuper />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetailSuper;
