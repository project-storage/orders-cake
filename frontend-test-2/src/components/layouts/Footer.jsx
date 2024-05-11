import React from 'react';
import { Box, Container, Typography, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme

const theme = createTheme(); // Create a theme

const Footer = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                component="footer"
                sx={{
                    p: 1,
                    width: '100%',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            flexGrow: 1,
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                    >
                        <Typography align="left" style={{ color: '#8888' }}>
                            Copyright © 2024 Narongsak P All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Footer;


