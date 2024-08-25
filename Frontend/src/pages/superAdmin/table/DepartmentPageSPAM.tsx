import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import FlexBetween from "../../../configs/FlexBetween";
import Department from "../../../components/common/superAdmin/table/Department";

const DepartmentPageSPAM = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <FlexBetween>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            Departments
          </Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{ mt: { xs: 1, sm: 0 } }}
          >
            <Link href="#" color="inherit">
              admin
            </Link>
            <Typography color="textPrimary">Departments</Typography>
          </Breadcrumbs>
        </FlexBetween>
      </Box>
      <Box>
        <Department />
      </Box>
    </Box>
  );
};

export default DepartmentPageSPAM;
