import { Box, Typography } from "@mui/material";
import React from "react";
import { FOOTTER } from "../config/constants";

const Footter = () => {
  return (
    <Box
      sx={{
        p: 1,
        bottom: 0,
        position: "absolute",
        width: "100%",
      }}
      component="footer"
    >
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Typography variant="caption"> &#169; {FOOTTER}</Typography>
      </Box>
    </Box>
  );
};

export default Footter;
