import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const CakeCard = () => {
    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                <Card sx={{ maxWidth: 345, bgcolor: 'red' }}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                เค้กครีมสด
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                10 ปอนด์
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                <Card sx={{ maxWidth: 345, bgcolor: 'green' }}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                เค้กครีมสด
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                10 ปอนด์
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                <Card sx={{ maxWidth: 345, bgcolor: 'yellow' }}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                เค้กครีมสด
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                10 ปอนด์
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={6} xl={6}>
                <Card sx={{ maxWidth: 345, bgcolor: 'blue' }}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                เค้กครีมสด
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                10 ปอนด์
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            {/* เพิ่ม Grid item อื่น ๆ ตามต้องการ */}
        </Grid>
    )
}

export default CakeCard
