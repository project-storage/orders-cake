import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

const CakeCard = () => {
    return (
        <Grid
            container
            spacing={3}
            sx={{ padding: 2 }}
        >
            {[
                { color: 'white', text: 'เค้กครีมสด', weight: '10 ปอนด์' },  // Light Red
                { color: 'white', text: 'เค้กช็อกโกแลต', weight: '5 ปอนด์' }, // Light Green
                { color: 'white', text: 'เค้กผลไม้', weight: '3 ปอนด์' },     // Light Yellow
                { color: 'white', text: 'เค้กวนิลา', weight: '7 ปอนด์' }      // Light Blue
            ].map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card 
                        sx={{ 
                            maxWidth: 345, 
                            bgcolor: item.color, 
                            boxShadow: 3, 
                            borderRadius: 2,
                            '&:hover': {
                                boxShadow: 6,
                            },
                            transition: 'box-shadow 0.3s ease-in-out',
                        }}
                    >
                        <CardContent>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.text}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.weight}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CakeCard;
