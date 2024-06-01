import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchAllUsers } from '../../../../../slices/userSlice'
import { Box, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom'
import { UPDATE_USER } from '../../../../../configs/constrants'
import Swal from 'sweetalert2'

const UserSuperAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    const handleUpdate = (id) => {
        navigate(`${UPDATE_USER}/${id}`)
    }

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
                await dispatch(deleteUser(id))
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
            Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถลบข้อมูลได้', 'error');
        }
    }
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "title",
            headerName: "คำนำหน้า",
            width: 150,
        },
        {
            field: "name",
            headerName: "ชื่อ",
            width: 200,
        },
        {
            field: "surname",
            headerName: "นามสกุล",
            width: 200,
        },
        {
            field: "tel",
            headerName: "เบอร์โทรศัพท์",
            width: 200,
        },
        { field: "role", headerName: "สถานะ", width: 200 },

        {
            field: "actions",
            headerName: "Actions",
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
    return (
        <Box className="table-user-all">
            <Box sx={{ height: 410, width: '100%' }}>
                <DataGrid
                    rows={users}
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
                    pageSizeOptions={[5, 10, 20, 50, 100]}
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
    )
}

export default UserSuperAdmin