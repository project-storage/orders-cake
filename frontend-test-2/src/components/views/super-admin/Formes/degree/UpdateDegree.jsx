import { Box, Button, TextField, Typography, } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DegreeService from '../../../../../services/DegreeService';
import { DEGREE_PATH } from '../../../../../configs/constrants';

const UpdateDegree = () => {
    const [degreeName, setDegreeName] = useState("")
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
            const res = await DegreeService.getById(id)
            if (res.status === 200) {
                setDegreeName(res.data.data[0].degreeName)
            }
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await DegreeService.updateById(id, {
                degreeName: degreeName
            })

            if (res.status === 200) {
                navigate(DEGREE_PATH)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "สร้างข้อมูลสำเร็จ!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            setError(error.res.data.message);
        }
    }

    const handleCancelClick = () => {
        navigate(DEGREE_PATH)
    }
    return (
        <Box className="update-degree" sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" fontWeight="bold">
                    อัพเดทข้อมูล
                </Typography>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="degreeName"
                    name="name"
                    label="ระดับชั้น"
                    type="name"
                    fullWidth
                    value={degreeName}
                    onChange={(e) => setDegreeName(e.target.value)}
                />
                <Box sx={{mt:2}}>
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
                        onClick={handleCancelClick}
                    >
                        ยกเลิก
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default UpdateDegree