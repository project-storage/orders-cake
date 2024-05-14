const db = require('../models')
const tb_status = db.tb_status

const createStatue = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { statusName } = req.body

        const newStatus = new tb_status({ statusName })

        const saveStatus = await newStatus.save()

        return res
            .status(201)
            .json({
                status_code: 201,
                msg: 'Status created successfully',
                data: saveStatus
            });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const getStatusAll = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const statuses = await tb_status.findAll({})


        return res.status(200).json({
            status_code: 200,
            message: "Get All statuses success",
            data: statuses
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const updateStatus = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { statusName } = req.body

        const statuses = await tb_status.findOne({ where: { id: req.params.id } })

        if (!statuses) {
            return res.status(404).json({
                status_code: 404,
                msg: "Status not found"
            })
        }

        statuses.statusName = statusName || statuses.statusName

        const updateStatus = await statuses.save()

        if (!updateStatus) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Error updating status'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'Status updated successfully!',
            data: updateStatus
        });

    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const deleteStatus = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const status = await tb_status.findOne({ where: { id: req.params.id } });

        if (!status) {
            return res.status(404).json({
                status_code: 404,
                msg: "Status not found"
            })
        }

        const deleteStatus = await tb_status.destroy({ where: { id: req.params.id } });

        if (!deleteStatus) {
            return res.status(400).json({
                status_code: 400,
                message: 'Error deleting status'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'Status deleted successfully'
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

module.exports = {
    createStatue,
    getStatusAll,
    updateStatus,
    deleteStatus
}