import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'cakeName', headerName: 'ชื่อเค้ก', width: 150 },
        { field: 'price', headerName: 'ราคา', width: 150 },
        {
            field: 'Action',
            headerName: 'Action',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            renderCell: (params) => (
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
            ),
        },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Box className="table-cake">
            <Box sx={{ height: 370, width: '100%' }}>
                <DataGrid
                    rows={cakes}
                    columns={columns}
                    sortModel={[{ field: 'id', sort: 'desc' }]}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    slots={{ toolbar: GridToolbar }}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    disableExportSelector
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            printOptions: { disableToolbarButton: true },
                            csvOptions: { disableToolbarButton: true },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default CakeSuperAdmin;
