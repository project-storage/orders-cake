const db = require('../models');
const tb_degree = db.tb_degree;
const tb_department = db.tb_department;
const tb_user = db.tb_user;
const tb_group = db.tb_group;

// Create group
const createGroup = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { roomName, teachID, departID, degreeID } = req.body;

        const newGroup = new tb_group({ roomName, teachID, departID, degreeID });
        const saveGroup = await newGroup.save();

        return res.status(201).json({
            status_code: 201,
            msg: "Group created successfully",
            data: saveGroup
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// Get info group
const getGroupInfo = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const groupByID = await tb_group.findAll({
            where: { teachID: req.user.id },
            include: [
                {
                    model: tb_user,
                    as: 'teacher',
                },
                {
                    model: tb_department,
                    as: 'department',
                },
                {
                    model: tb_degree,
                    as: 'degree',
                },
            ],
        });

        if (groupByID.length === 0) {
            return res.status(404).json({
                status_code: 404,
                msg: "Group data not found"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'Get info data group',
            data: groupByID,
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// Get info group
const getGroupById = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const groupByID = await tb_group.findAll({
            where: { id: req.params.id },
            include: [
                {
                    model: tb_user,
                    as: 'teacher',
                },
                {
                    model: tb_department,
                    as: 'department',
                },
                {
                    model: tb_degree,
                    as: 'degree',
                },
            ],
        });

        if (groupByID.length === 0) {
            return res.status(404).json({
                status_code: 404,
                msg: "Group data not found"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'Get info data group',
            data: groupByID,
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};
const getGroupAll = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const groups = await tb_group.findAll({
            include: [
                {
                    model: tb_user,
                    as: 'teacher',
                },
                {
                    model: tb_department,
                    as: 'department',
                },
                {
                    model: tb_degree,
                    as: 'degree',
                },
            ],
        });

        return res.status(200).json({
            status_code: 200,
            msg: "Get all data group",
            data: groups
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

const searchGroup = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { id, roomName, teachID, departID, degreeID } = req.query;

        const whereClause = {};
        if (id) {
            whereClause.id = id;
        }
        if (roomName) {
            whereClause.roomName = roomName;
        }
        if (teachID) {
            whereClause.teachID = teachID;
        }
        if (departID) {
            whereClause.departID = departID;
        }
        if (degreeID) {
            whereClause.degreeID = degreeID;
        }

        const groups = await tb_group.findAll({
            where: whereClause,
            include: [
                {
                    model: tb_user,
                    as: 'teacher',
                },
                {
                    model: tb_department,
                    as: 'department',
                },
                {
                    model: tb_degree,
                    as: 'degree',
                },
            ],
        });

        if (groups.length === 0) {
            return res.status(404).json({
                status_code: 404,
                msg: "No data found"
            });
        }

        return res.status(200).json({ 
            status_code: 200, 
            data: groups 
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

const updateGroup = async (req, res) => {
    const { roomName, teachID, departID, degreeID } = req.body;
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const group = await tb_group.findOne({
            where: { id: req.params.id }
        });

        if (!group) {
            return res.status(404).json({
                status_code: 404,
                msg: 'Group data not found'
            });
        }

        group.roomName = roomName || group.roomName;
        group.teachID = teachID || group.teachID;
        group.departID = departID || group.departID;
        group.degreeID = degreeID || group.degreeID;

        const updateGroup = await group.save();

        return res.status(200).json({
            status_code: 200,
            msg: 'Group updated successfully',
            data: updateGroup
        });

    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

const deleteGroup = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const group = await tb_group.findOne({
            where: { id: req.params.id }
        });

        if (!group) {
            return res.status(404).json({
                status_code: 404,
                msg: 'Group data not found'
            });
        }

        await tb_group.destroy({
            where: { id: req.params.id }
        });

        return res.status(200).json({
            status_code: 200,
            msg: 'Group deleted successfully'
        });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

module.exports = {
    createGroup,
    getGroupInfo,
    getGroupById,
    getGroupAll,
    searchGroup,
    updateGroup,
    deleteGroup
};
