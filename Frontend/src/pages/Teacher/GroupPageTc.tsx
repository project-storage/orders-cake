import React from 'react'
import Group from '../../components/common/Teacher/Group';
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import FlexBetween from "../../configs/FlexBetween";

const GroupPageTc = () => {
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
          Dashboard
        </Typography>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mt: { xs: 1, sm: 0 } }}
        >
          <Link href="#" color="inherit">
            teacher
          </Link>
          <Typography color="textPrimary">Groups</Typography>
        </Breadcrumbs>
      </FlexBetween>
    </Box>
    <Box>
      <Group />
    </Box>
  </Box>
  )
}

export default GroupPageTc