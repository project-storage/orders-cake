import { Box, styled } from "@mui/material";

const FlexBetween = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row", // Default direction
  justifyContent: "space-between",
  alignItems: "center", // Default alignment
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column", // Direction on small screens
    alignItems: "flex-start", // Alignment on small screens
  },
}));

export default FlexBetween;
