import React, { useEffect } from 'react';
import { Box, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { UPDATE_CAKEA_PATH } from '../../../../../configs/constrants';
import { useNavigate } from 'react-router-dom';
import { fetchCakes, deleteCake } from '../../../../../slices/cakeSlice';

const CakeSuperAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cakes, loading, error } = useSelector((state) => state.cakes);

    useEffect(() => {
        dispatch(fetchCakes());
    }, [dispatch]);

    const handleUpdate = (id) => {
        navigate(`${UPDATE_CAKEA_PATH}/${id}`);
    };

    const handleDeleteButtonClick = async (id) => {
        try {
            const response = await Swal.fire({
                title: 'คุณแน่ใจหรือไม่ที่จะลบข้อมูล',
                text: 'โปรดตรวจสอบข้อมูลก่อนลบ',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ลบ',
                cancelButtonText: 'ยกเลิก',
            });

            if (response.isConfirmed) {
                await dispatch(deleteCake(id));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'สำเร็จ!',
                    text: 'ข้อมูลถูกลบเรียบร้อย!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error deleting cake:', error);
            Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถลบข้อมูลเค้กได้', 'error');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="cake table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">ชื่อเค้ก</TableCell>
                        <TableCell align="left">ราคา</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cakes.map((cake) => (
                        <TableRow key={cake.id}>
                            <TableCell component="th" scope="row">
                                {cake.id}
                            </TableCell>
                            <TableCell align="left">{cake.cakeName}</TableCell>
                            <TableCell align="left">{cake.price}</TableCell>
                            <TableCell align="center">
                                <Box>
                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        startIcon={<BorderColorIcon />}
                                        onClick={() => handleUpdate(cake.id)}
                                    >
                                        แก้ไข
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteButtonClick(cake.id)}
                                        sx={{ ml: 2 }}
                                    >
                                        ลบข้อมูล
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CakeSuperAdmin;
