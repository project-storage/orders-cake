import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CakeService from '../../../../../services/CakeService';
import { CAKE_PATH, UPDATE_CAKEA_PATH } from '../../../../../configs/constrants';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { cakeGetById, updateCake } from '../../../../../slices/cakeSlice';

const UpdateCake = () => {
    const [cakeName, setCakeName] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [updatedCake, setUpdatedCake] = useState(false)

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { cake } = useSelector((state) => state.cakes)

    useEffect(() => {
        if (id) {
            dispatch(cakeGetById(id))
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (cake) {
            setCakeName(cake.cakeName)
            setPrice(cake.price)
        }
    }, [cake])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(updateCake({ id, cakeName, price })).unwrap();
            if (res) {
                setUpdatedCake(true)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "อัพเดทข้อมูลสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.error("Error:", error.response);
            setError(error);
        }
    };

    const handleCancelClick = () => {
        navigate(CAKE_PATH);
    };

    useEffect(() => {
        if (updatedCake) {
            setTimeout(() => {
                window.location.reload()
            }, 500);
        }

    }, [updatedCake])

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
                    <Grid item md={6} xs={12}>
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
                    <Grid item md={6} xs={12}>
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
