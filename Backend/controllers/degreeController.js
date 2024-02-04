const db = require('../models');
const Degree = db.degree;

const createDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { degreeName } = req.body;

        const newDegree = new Degree({ degreeName: degreeName });
        const saveDegree = await newDegree.save();
        console.log(searchDegree)

        return res.status(200).json({
            status: 200,
            message: 'Create degree successfully',
            data: saveDegree
        });
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({
                status: 500,
                message: `An error occurred creating data: ${error}`
            });
    }
};

const getAllDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const degreeAll = await Degree.findAll({});
        return res.status(200).json({
            status: 200,
            message: "Get all data success",
            data: degreeAll
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: `An error occurred getting all data: ${error}`
        });
    }
};

const searchDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id, degreeName } = req.query;

        const whereClause = {};

        if (id) {
            whereClause.id = id;
        }
        if (degreeName) {
            whereClause.degreeName = degreeName;
        }

        const degreeQuery = await Degree.findOne({ where: whereClause });

        return res.status(200).json({
            status: 200,
            data: degreeQuery
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 200,
            message: `An error occurred searching data: ${error}`
        });
    }
};

const updateDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { degreeName } = req.body;

        const degree = await Degree.findOne({ where: { id: req.params.id } });

        if (!degree) {
            return res.status(404).json({
                status: 404,
                message: 'Not Found Degree'
            });
        }

        degree.degreeName = degreeName || degree.degreeName;

        const updateDegree = await degree.save();

        return res.status(200).json({
            status: 200,
            message: "Update Degree Success",
            data: updateDegree
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: `An error occurred updating data: ${error}`
        });
    }
};

const deleteDegree = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const degree = await Degree.findOne({
            where: { id: req.params.id }
        });

        if (!degree) {
            return res.status(404).json({
                status: 404,
                message: "Not Found Degree"
            });
        }

        const deleteDegree = await Degree.destroy({
            where: { id: req.params.id }
        });

        if (!deleteDegree) {
            return res.status(404).json({
                status: 404,
                message: "An error occurred deleting degree data."
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Delete data degree success"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: `An error occurred deleting data: ${error}`
        });
    }
};

module.exports = {
    createDegree,
    getAllDegree,
    searchDegree,
    updateDegree,
    deleteDegree
};
