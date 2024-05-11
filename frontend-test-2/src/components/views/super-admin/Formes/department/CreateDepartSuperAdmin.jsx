import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DepartmentService from '../../../../../services/DepartmentService'
import Swal from 'sweetalert2'

const CreateDepartSuperAdmin = () => {
    const [departName, setDepartName] = useState("");
    const [departCode, setDepartCode] = useState("");
    const [departCreated, setDepartCreated] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const create = await DepartmentService.create({
                departName: departName,
                departCode: departCode
            });

            if (create.status === 200) {
                setDepartCreated(true);
                setOpen(false); // Close the dialog after submission
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "สร้างข้อมูลสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error creating data: ", error);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (departCreated) {
            setTimeout(() => {
                window.location.reload()
            }, 550);
        }
    }, [departCreated]);

    return (
        <Box className="form-create-department">
            <Button  variant="contained" onClick={handleClickOpen}>
                สร้างข้อมูล
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>สร้างข้อมูลสาขา</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="departName"
                            name="departName"
                            label="ชื่อสาขา"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={departName}
                            onChange={(e) => setDepartName(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="departCode"
                            name="departCode"
                            label="รหัสสาขา"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={departCode}
                            onChange={(e) => setDepartCode(e.target.value)}
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

export default CreateDepartSuperAdmin;
