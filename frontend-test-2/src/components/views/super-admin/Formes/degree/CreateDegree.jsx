import React, { useEffect, useState } from 'react'
import DegreeService from '../../../../../services/DegreeService'
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Swal from 'sweetalert2';

const degreeCreated = () => {
    const [degreeName, setDegreeName] = useState("")
    const [error, setError] = useState("");
    const [degreeCreated, setDegreeCreated] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const create = await DegreeService.create({
                degreeName: degreeName,
            });

            if (create.status === 200) {
                setDegreeCreated(true)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "สร้างข้อมูลสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (degreeCreated) {
            setTimeout(() => {
                window.location.reload()
            }, 550);
        }
    }, [degreeCreated])
    return (
        <div className='form-creat-degree'>
            <Box sx={{ mt: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4" fontWeight="bold" >
                        เพิ่มข้อมูลระดับชั้น
                    </Typography>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="degree"
                                name="name"
                                label="ระดับชั้น"
                                type="name"
                                fullWidth
                                value={degreeName}
                                onChange={(e) => setDegreeName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button color="success" variant="contained" type="submit" sx={{mt:1}}>
                        <Typography variant="h6">เพิ่มข้อมูลระดับชั้น</Typography>
                    </Button>
                </form>
            </Box>
        </div>
    )
}

export default degreeCreated