import React from "react";
import { Card, Box, Typography, Grid } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const CardSuperAdmin = () => {
    const userData = [
        { title: "จำนวนผู้ใช้งาน", value: 200, icon: <HomeOutlinedIcon /> },
        { title: "จำนวนผู้ใช้งาน", value: 200 },
        { title: "จำนวนผู้ใช้งาน", value: 200 },
        { title: "จำนวนผู้ใช้งาน", value: 200 },

    ];
    
    return (
        <>
            <Grid
                container
                sx={{ display: "flex", justifyContent: "center" }}
                spacing={2}
            >
                {userData.map((data, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card variant="outlined" sx={style.cardStyle}>
                            <Box
                                sx={{
                                    borderRadius: "50%",
                                    background: "#F08383",
                                    border: 0,
                                    width: "3rem",
                                    height: "3rem",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 1.5,
                                    }}
                                >
                                    {data.icon}
                                </Box>
                            </Box>
                            <Box sx={{ padding: 0, margin: 0 }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    {data.title}
                                </Typography>
                                <Typography sx={{ fontSize: 25 }}>{data.value}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

const style = {
    cardStyle: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 2,
        margin: 1,
        height: 100,
        // width:200
    }
};

export default CardSuperAdmin