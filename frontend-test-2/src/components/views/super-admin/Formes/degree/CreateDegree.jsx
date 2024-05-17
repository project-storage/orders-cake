import React, { useEffect, useState } from 'react'
import DegreeService from '../../../../../services/DegreeService'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import Swal from 'sweetalert2';

const degreeCreated = () => {
    const [degreeName, setDegreeName] = useState("")
    const [error, setError] = useState("");
    const [degreeCreated, setDegreeCreated] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const create = await DegreeService.create({
                degreeName: degreeName,
            });

            if (create.status === 201) {
                setDegreeCreated(true)
                setOpen(false)
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (degreeCreated) {
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    }, [degreeCreated])
    return (
        <Box className="form-create-degree">
            <Button variant="contained" onClick={handleClickOpen}>
                สร้างข้อมูล
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>สร้างข้อมูลระดับชั้น</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="degreeName"
                            name="degreeName"
                            label="ระดับชั้น"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={degreeName}
                            onChange={(e) => setDegreeName(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color='error'>ยกเลิก</Button>
                    <Button type="submit" onClick={handleSubmit} color='success' variant="contained" >ยืนยัน</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default degreeCreated