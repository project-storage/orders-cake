import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const SidebarFooter = () => {
  return (
    <Box
      sx={{
        padding: '15px 10px',
        borderTop: '1px solid #ddd',
        backgroundColor: '#e3f2fd', // Light blue background
        textAlign: 'center',
        // position: 'absolute',
        bottom: 0,
        width: '100%',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
        © Developed By Narongsak P.
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
        version 1.0.0
      </Typography>
      {/* <Link href="https://www.example.com" target="_blank" rel="noopener">
        Privacy Policy
      </Link> */}
    </Box>
  );
};

export default SidebarFooter;
