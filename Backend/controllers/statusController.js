const db = require('../models')
const Statuses = db.status

const createStatues = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { statusName } = req.body

        const newStatus = new Statuses({ statusName })
        const saveStatus = await newStatus.save()

        return res
            .status(500)
            .json({ status_code: 500, message: 'Statuses created successfully', data: saveStatus });
    } catch (error) {

    }
}

const getAllStatus = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const statuses = await Statuses.findAll({})


        return res.status(200).json({ status_code: 200, message: "Get All statuses success", data: statuses });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching status data' });
    }
}

const updateStatus = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { statusName } = req.body

        const statuses = await Statuses.findOne({ where: { id: req.params.id } })

        if (!statuses) {
            return res.status(404).json({ message: "Status not found" })
        }

        statuses.statusName = statusName || statuses.statusName

        const updateStatus = await statuses.save()

        if (!updateStatus) {
            return res.status(400).json({ message: 'Error updating status' });
        }

        return res.status(200).json({
            status_code: 200,
            message: 'Status updated successfully!',
            updatedDepartment: updateStatus
        });

    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while updating status data' });
    }
}

const deleteStatus = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const status = await Statuses.findOne({ where: { id: req.params.id } });

        if (!status) {
            return res.status(404).json({ message: 'Status not found' });
        }

        const deleteStatus = await Statuses.destroy({ where: { id: req.params.id } });

        if (!deleteStatus) {
            return res.status(400).json({ message: 'Error deleting status' });
        }

        return res.status(200).json({ message: 'Status deleted successfully' });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while deleting status data' });
    }
}

module.exports = {
    createStatues,
    getAllStatus,
    updateStatus,
    deleteStatus
}