import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import Dashboard from "../../components/common/superAdmin/Dashboard";

const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            ประเภทสินค้า
          </Typography>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            <Link href="#" color="inherit">
              admin
            </Link>
            <Typography color="textPrimary">dashonard</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <Box>
        <Dashboard />
      </Box>
    </Box>
  );
};

export default DashboardPage;
