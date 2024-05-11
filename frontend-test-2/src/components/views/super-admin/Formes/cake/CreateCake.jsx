import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CakeService from "../../../../../services/CakeService";
import Swal from "sweetalert2";


const CreateCake = () => {
    const [cakeName, setCakeName] = useState("");
    const [price, setPrice] = useState("");
    const [pound, setPound] = useState("")
    const [error, setError] = useState("");
    const [cakeCreated, setCakeCreated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cakeName === "" || pound === "" || price === "") {
            // แจ้งเตือนให้กรอกข้อมูลให้ครบถ้วน
            Swal.fire({
                icon: "warning",
                title: "กรุณากรอกข้อมูลให้ครบถ้วน",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        try {
            const res = await CakeService.create({
                cakeName: cakeName,
                pound: pound,
                price: price,
            });

            if (res.status === 200) {
                setCakeCreated(true); // เมื่อสร้างเค้กสำเร็จ ให้กำหนดค่าให้ cakeCreated เป็น true
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

    useEffect(() => {
        // ถ้าเค้กถูกสร้างสำเร็จ ให้รีเฟรชหน้าเว็บ
        if (cakeCreated) {
            setTimeout(() => {
                window.location.reload();
            }, 750)
        }
    }, [cakeCreated]);
    return (
        <Box className="create-cake" sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" fontWeight="bold">
                    เพิ่มข้อมูลเค้ก
                </Typography>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item md={4} xs={12}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="cakeName"
                            name="cakeName"
                            label="ชื่อเค้ก"
                            type="name"
                            fullWidth
                            value={cakeName}
                            onChange={(e) => setCakeName(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="pound"
                            name="pound"
                            label="จำนวนปอนด์"
                            type="number"
                            fullWidth
                            value={pound}
                            onChange={(e) => setPound(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="price"
                            name="price"
                            label="ราคา"
                            type="number"
                            fullWidth
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Button

                            color="success"
                            variant="contained"
                            type="submit"
                        >
                            เพิ่มข้อมูลเค้ก
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateCake;
