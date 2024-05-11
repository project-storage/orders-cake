import React, { useEffect,useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CakeService from '../../../../../services/CakeService';
import Swal from 'sweetalert2';
import { UPDATE_CAKEA_PATH } from '../../../../../configs/constrants';
import { useNavigate } from 'react-router-dom';

const CakeSuperAdmin = () => {
    const [cakes, setCakes] = useState([])
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const res = await CakeService.getAll()
            setCakes(res.data.data)
        } catch (error) {
            console.error("Error fetching cakes:", error);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleUpdate = async (id) => {
        navigate(`${UPDATE_CAKEA_PATH}/${id}`);
    };

    const handleDeleteButtonClick = async (id) => {
        try {
            const response = await Swal.fire({
                title: "คุณแน่ใจหรือไม่ที่จะลบข้อมูล",
                text: "โปรดตรวจสอบข้อมูลก่อนลบ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ลบ",
                cancelButtonText: "ยกเลิก",
            });

            if (response.isConfirmed) {
                await CakeService.deleteById(id);
                const updatedCakes = cakes.filter((cake) => cake.id !== id);
                setCakes(updatedCakes);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "สำเร็จ!",
                    text: `ข้อมูลถูกลบเรียบร้อย!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error deleting cake:", error);
            Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบข้อมูลเค้กได้", "error");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: "cakeName", headerName: "ชื่อเค้ก", width: 150 },
        { field: "pound", headerName: "ปอนด์", width: 150 },
        { field: "price", headerName: "ราคา", width: 150 },
        {
            field: 'Action',
            headerName: 'Action',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <Box>
                        <Button
                            variant="outlined"
                            color="warning"
                            startIcon={<BorderColorIcon />}
                            onClick={() => handleUpdate(params.id)}
                        >
                            แก้ไข
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteButtonClick(params.row.id)}
                            sx={{ ml: 2 }}
                        >
                            ลบข้อมูล
                        </Button>
                    </Box>
                )
            }
        },
    ];

    return (
        <Box className="table-cake">
            <Box sx={{ height: 370, width: '100%' }}>
                <DataGrid
                    rows={cakes}
                    columns={columns}
                    sortModel={[
                        {
                            field: 'id',
                            sort: 'desc',
                        },
                    ]}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </Box>
        </Box>
    )
}

export default CakeSuperAdmin