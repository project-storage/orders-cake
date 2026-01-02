const db = require('../models')
const tb_degree = db.tb_degree

const createDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { degreeName } = req.body;

        const newDegree = new tb_degree({ degreeName: degreeName });

        const saveDegree = await newDegree.save();

        return res.status(201).json({
            status_code: 201,
            msg: 'degree created success',
            data: saveDegree
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

const getDegreeInfo = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'advisor') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const degree = await tb_degree.findAll({ where: { id: req.params.id } });

        if (!degree) {
            return res.status(404).json({
                status_code: 404,
                msg: 'degree not found'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Get Info data success",
            data: degree
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

const getAllDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin' && req.user.role !== 'advisor') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const degreeAll = await tb_degree.findAll({});

        return res.status(200).json({
            status_code: 200,
            msg: "Get all data success",
            data: degreeAll
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const searchDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin' && req.user.role !== 'advisor') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { id, degreeName } = req.query;

        const whereClause = {};

        if (id) {
            whereClause.id = id;
        }
        if (degreeName) {
            whereClause.degreeName = degreeName;
        }

        const degreeQuery = await tb_degree.findOne({ where: whereClause });

        if (!degreeQuery) {
            return res.status(404).json({
                status_code: 404,
                msg: 'degree not found'
            });
        }
        return res.status(200).json({
            status_code: 200,
            data: degreeQuery
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

const updateDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { degreeName } = req.body;

        const degree = await tb_degree.findOne({ where: { id: req.params.id } });

        if (!degree) {
            return res.status(404).json({
                status_code: 404,
                msg: 'Not Found Degree'
            });
        }

        degree.degreeName = degreeName || degree.degreeName;

        const updateDegree = await degree.save();

        return res.status(200).json({
            status_code: 200,
            msg: "Update Degree Success",
            data: updateDegree
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

const deleteDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const degree = await tb_degree.findOne({
            where: { id: req.params.id }
        });

        if (!degree) {
            return res.status(404).json({
                status_code: 404,
                msg: "Not Found degree"
            });
        }

        const deleteDegree = await tb_degree.destroy({
            where: { id: req.params.id }
        });

        if (!deleteDegree) {
            return res.status(404).json({
                status_code: 404,
                msg: "An error occurred deleting degree data."
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Delete data degree success"
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

module.exports={
    createDegree,
    getDegreeInfo,
    getAllDegree,
    searchDegree,
    updateDegree,
    deleteDegree
}