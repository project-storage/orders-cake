import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CakeService from '../../../../../services/CakeService';
import { CAKE_PATH } from '../../../../../configs/constrants';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

const UpdateCake = () => {
    const [cakeName, setCakeName] = useState("");
    const [price, setPrice] = useState("");
    const [pound, setPound] = useState("")
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await CakeService.getById(id);
                if (response.status === 200) {
                    setCakeName(response.data.data[0].cakeName);
                    setPound(response.data.data[0].pound);
                    setPrice(response.data.data[0].price);
                }
            } catch (error) {
                console.error("Error", error);
                setError(error);
            }
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await CakeService.updateById(id, {
                cakeName: cakeName,
                pound: pound,
                price: price,
            });

            if (response.status === 200) {
                navigate(CAKE_PATH)
            }

            Swal.fire({
                position: "center",
                icon: "success",
                title: "อัพเดทข้อมูลสำเร็จ!",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error:", error.response);
            setError(error);
        }
    };


    const handleCancelClick = () => {
        navigate(CAKE_PATH);
    };

    return (
        <Box className="update-cake" sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" fontWeight="bold" mb="1rem">
                    อัพเดทข้อมูล
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
                            // sx={{ ml: 2 }}
                            color="success"
                            variant="contained"
                            type="submit"
                        >
                            อัพเดทข้อมูล
                        </Button>
                        <Button
                            sx={{ ml: 1 }}
                            color="error"
                            variant="contained"
                            onClick={handleCancelClick} // แก้ onClick เป็น handleCancelClick
                        >
                            ยกเลิก
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default UpdateCake;
