const db = require('../models')
const Teacher = db.teacher
const Department = db.department
const Degree = db.degree
const Group = db.group
const User = db.user

// Create group
const createGroup = async (req, res) => {
    try {
        // Check user roles
        if (
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'tearcher'
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { roomName, teachID, departID, degreeID } = req.body

        // if (roomName, teachID, departID, degreeID) {
        //     return res.status(400).json({ message: 'Please fill in all fields' })
        // }
        const newGroup = new Group({ roomName, teachID, departID, degreeID })
        const saveGroup = await newGroup.save()

        return res.status(200).json({
            status_code: 200,
            message: "Group created successfully",
            data: saveGroup
        })
    } catch (error) {
        console.error(error);
        return res.json({ status_code: 500, message: "An error occurred while creating group" })
    }
}

// Get info group
const getInfoGroup = async (req, res) => {
    try {
        // Check user roles
        if (
            req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'teacher'
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const groupByID = await Group.findAll({
            where: { teachID: req.user.id },
            include: [
                {
                    model: User,
                    as: 'users',
                },
                {
                    model: Department,
                    as: 'departments',
                },
                {
                    model: Degree,
                    as: 'degrees',
                },
            ],
        });

        if (!groupByID) {
            return res.status(401).json({ message: "Group data not found" });
        }

        return res.status(200).json({
            status_code: 200,
            message: 'Get info data group',
            data: groupByID,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status_code: 500,
            message: 'An error occurred while retrieving group information',
        });
    }
};

const getAllGroup = async (req, res) => {
    try {
        // Check user roles
        if (
            req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin'
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const groups = await Group.findAll({
            include: [
                {
                    model: User,
                    as: 'users',
                },
                {
                    model: Department,
                    as: 'departments',
                },
                {
                    model: Degree,
                    as: 'degrees',
                },
            ],
        })

        return res.status(200).json({ status_code: 200, message: "Get all data group", data: groups })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status_code: 500,
            message: 'An error occurred while get all group ',
        });
    }
}

const getGroupWithAllParams = async (req, res) => {
    try {
        if (
            req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'teacher'
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id, roomName, teachID, departID, degreeID } = req.query;

        const whereClause = {}
        if (id) {
            whereClause.id = id
        }
        if (roomName) {
            whereClause.id = roomName
        }
        if (teachID) {
            whereClause.teachID = teachID
        }
        if (departID) {
            whereClause.departID = departID
        }
        if (degreeID) {
            whereClause.degreeID = degreeID
        }

        const groups = await Group.findAll({ where: whereClause })

        if (groups.length == 0) {
            return res.status(404).json({ status_code: 404, message: "No data found" })
        }

        return res.status(200).json({ status_code: 200, data: groups })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching group data' })
    }
}

const updateGroup = async (req, res) => {
    let group

    const { roomName, teachID, departID, degreeID } = req.body;
    try {
        if (
            req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'teacher'
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        group = await Group.findOne({
            where: { id: req.params.id }
        })
        if (!req.params.id) {
            return res.status(404).json({ message: 'Group update requires an id' });
        }

        group.roomName = roomName || group.roomName
        group.teachID = teachID || group.teachID
        group.departID = departID || group.departID
        group.degreeID = degreeID || group.degreeID

        const updateGroup = await group.save()

        if (!updateGroup) {
            return res.status(400).json({ message: 'Error updating group data' });
        }

        return res.status(200).json({
            status_code: 200,
            message: 'Group updated successfully',
            data: updateGroup
        });

    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'An error occurred while updating group data' });
    }
}

const deleteGroup = async (req, res) => {
    try {
        if (
            req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'teacher'
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const deleteGroup = await Group.destroy({
            where: { id: req.params.id }
        })

        if (!deleteGroup) {
            return res.status(400).json({ message: 'Error deleting group' });
        }

        return res.status(200).json({ status_code: 200, message: 'Group deleted successfully' });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while deleting department' });
    }
}

module.exports = {
    createGroup,
    getInfoGroup,
    getAllGroup,
    getGroupWithAllParams,
    updateGroup,
    deleteGroup
}