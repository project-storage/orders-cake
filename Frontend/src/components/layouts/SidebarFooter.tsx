import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const SidebarFooter = () => {
  return (
    <Box
      sx={{
        padding: 2,
        borderTop: '1px solid #ddd',
        backgroundColor: '#f4f4f4',
        textAlign: 'center',
        // position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © Developed By Narongsak P.
      </Typography>
      <Typography variant="caption" color="textSecondary">
        version 1.0.0
      </Typography>
      {/* <Link href="https://www.example.com" target="_blank" rel="noopener">
        Privacy Policy
      </Link> */}
    </Box>
  );
};

export default SidebarFooter;
