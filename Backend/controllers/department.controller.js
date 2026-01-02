const db = require('../models')
const tb_department = db.tb_department

// Create department
const createDepartment = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { departCode, departName } = req.body;

        const alreadyExistsDepartName = await tb_department.findOne({
            where: { departName: departName }
        });

        const alreadyExistsDepartCode = await tb_department.findOne({
            where: { departCode: departCode }
        });

        if (alreadyExistsDepartName) {
            return res.status(409).json({
                status_code: 409,
                msg: 'Department already exists'
            });
        }

        if (alreadyExistsDepartCode) {
            return res.status(409).json({
                status_code: 409,
                msg: 'Department code already exists'
            });
        }

        if (isNaN(departCode)) {
            return res.status(404).json({
                status_code: 404,
                msg: 'departCode should be a number'
            });
        }

        const newDepartment = new tb_department({ departName, departCode });

        const savedDepartment = await newDepartment.save();

        return res.status(201).json({
            status_code: 201,
            msg: 'Department created successfully',
            data: savedDepartment
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Info department
const getInfoDepartment = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'advisor') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const department = await tb_department.findAll({
            where: { id: req.params.id }
        });

        if (!department) {
            return res.status(404).json({
                status_code: 404,
                msg: 'department not found'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Get info data department success",
            data: department
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// All departments
const getAllDepartment = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'advisor') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const departments = await tb_department.findAll();

        return res.status(200).json({
            status_code: 200,
            msg: "Get All department success",
            data: departments
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Search department
const searchDepartment = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'advisor') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { id, departName, departCode } = req.query;

        const whereClause = {};
        if (id) {
            whereClause.id = id;
        }
        if (departName) {
            whereClause.departName = departName;
        }
        if (departCode) {
            whereClause.departCode = departCode;
        }

        const departments = await tb_department.findAll({ where: whereClause });

        if (departments.length === 0) {
            return res.status(404).json({
                status_code: 404,
                msg: 'No data found'
            });
        }

        return res.status(200).json({ status_code: 200, data: departments });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Update department
const updateDepartment = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { departName, departCode } = req.body;

        const department = await tb_department.findOne({
            where: { id: req.params.id }
        });

        if (!department) {
            return res.status(404).json({
                status_code: 404,
                msg: 'No data found'
            });
        }

        department.departName = departName || department.departName;
        department.departCode = departCode || department.departCode;

        const updatedDepartment = await department.save();

        if (!updatedDepartment) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Error updating department'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'Department updated successfully!',
            data: updatedDepartment
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Delete department
const deleteDepartment = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const department = await tb_department.findOne({
            where: { id: req.params.id }
        });

        if (!department) {
            return res.status(404).json({ msg: 'department not found' });
        }

        const deleteDepartment = await tb_department.destroy({
            where: { id: req.params.id }
        });

        if (!deleteDepartment) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Error deleting department'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'Department deleted successfully'
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

module.exports = {
    createDepartment,
    getAllDepartment,
    searchDepartment,
    getInfoDepartment,
    updateDepartment,
    deleteDepartment
  };
  