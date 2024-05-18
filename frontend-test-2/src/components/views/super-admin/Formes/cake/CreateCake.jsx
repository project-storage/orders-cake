import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CakeService from "../../../../../services/CakeService";
import Swal from "sweetalert2";


const CreateCake = () => {
    const [cakeName, setCakeName] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [cakeCreated, setCakeCreated] = useState(false);
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await CakeService.create({
                cakeName: cakeName,
                price: parseFloat(price), // Ensure price is sent as a number
            });

            if (res.status === 201) {
                setCakeCreated(true); // เมื่อสร้างเค้กสำเร็จ ให้กำหนดค่าให้ cakeCreated เป็น true
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
            console.error("Error:", error.res);
            setError(error.res.cake.message);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // ถ้าเค้กถูกสร้างสำเร็จ ให้รีเฟรชหน้าเว็บ
        if (cakeCreated) {
            setTimeout(() => {
                window.location.reload();
            }, 1500)
        }
    }, [cakeCreated]);
    return (
        <Box className="form-create-cake">
            <Button variant="contained" onClick={handleClickOpen}>
                สร้างข้อมูล
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>สร้างข้อมูลเค้ก</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="cakeName"
                            name="cakeName"
                            label="ประเภทเค้ก"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={cakeName}
                            onChange={(e) => setCakeName(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="price"
                            name="price"
                            label="ราคา"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color='error'>ยกเลิก</Button>
                    <Button type="submit" onClick={handleSubmit} color='success' variant="contained" >ยืนยัน</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default CreateCake;
