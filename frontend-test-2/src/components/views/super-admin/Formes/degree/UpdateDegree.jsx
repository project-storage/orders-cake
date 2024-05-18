import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { degreeById, updateDegree } from '../../../../../slices/degreeSlice';
import { DEGREE_PATH } from '../../../../../configs/constrants';

const UpdateDegree = () => {
    const [degreeName, setDegreeName] = useState("");
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { degree, loading, error: fetchError } = useSelector((state) => state.degrees);

    useEffect(() => {
        if (id) {
            dispatch(degreeById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (degree) {
            setDegreeName(degree.degreeName);
        }
    }, [degree]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(updateDegree({ id, degreeName }));
            if (res.payload) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "อัพเดทข้อมูลสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancelClick = () => {
        navigate(DEGREE_PATH);
    };

    return (
        <Box className="update-degree" sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" fontWeight="bold">
                    อัพเดทข้อมูล
                </Typography>
                {fetchError && <Typography color="error">{fetchError}</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="degreeName"
                    name="degreeName"
                    label="ระดับชั้น"
                    type="text"
                    fullWidth
                    value={degreeName}
                    onChange={(e) => setDegreeName(e.target.value)}
                    disabled={loading}
                />
                <Box sx={{ mt: 2 }}>
                    <Button
                        color="success"
                        variant="contained"
                        type="submit"
                        disabled={loading}
                    >
                        อัพเดทข้อมูล
                    </Button>
                    <Button
                        sx={{ ml: 1 }}
                        color="error"
                        variant="contained"
                        onClick={handleCancelClick}
                        disabled={loading}
                    >
                        ยกเลิก
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default UpdateDegree;
