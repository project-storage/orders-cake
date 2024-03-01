import { Box, Grid } from "@mui/material";
import React from "react";
import CreateUser from "../../../components/SuperAdmin/FormCreate/CreateUser";

const CreateUserSuper = () => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={12}>
          <CreateUser />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateUserSuper;
