const db = require('../models')
const tb_cake = db.tb_cake

// Create a new cake
const createCake = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { cakeName, price } = req.body;

        const newCake = new tb_cake({ cakeName, price });

        const saveCake = await newCake.save();

        return res.status(201).json({
            status_code: 201,
            msg: 'Cake created successfully',
            data: saveCake
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Get information about a specific cake
const getCakeInfo = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const cakeById = await tb_cake.findAll({
            where: { id: req.params.id }
        });

        return res.status(200).json({
            status_code: 200,
            msg: `Retrieve data for ID: ${req.params.id} successful`,
            data: cakeById
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    };
}

// Get all cakes
const getCakeAll = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const cakeByAll = await tb_cake.findAll({});

        return res.status(200).json({
            status_code: 200,
            msg: "Get all data cake success",
            data: cakeByAll
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Search for cakes with specified parameters
const searchCake = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { id, cakeName } = req.query;

        const whereClause = {};

        if (id) {
            whereClause.id = id;
        }

        if (cakeName) {
            whereClause.cakeName = cakeName;
        }

        const cakeQuery = await tb_cake.findAll({ where: whereClause });

        return res.status(200).json({ status_code: 200, query_cake: cakeQuery });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Update cake information
const updateCake = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { cakeName, price } = req.body;

        const cake = await tb_cake.findOne({ where: { id: req.params.id } });

        if (!cake) {
            return res.status(404).json({
                status_code: 404,
                msg: 'Cake data not found'
            });
        }

        cake.cakeName = cakeName || cake.cakeName;
        cake.price = price || cake.price;

        const updateCake = await cake.save();

        return res.status(200).json({
            status_code: 200,
            msg: 'Cake updated successfully!',
            data: updateCake
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Delete a cake
const deleteCake = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'superAdmin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const cake = await tb_cake.findOne({
            where: { id: req.params.id }
        });

        if (!cake) {
            return res.status(404).json({
                status_code: 404,
                msg: 'Cake data not found'
            });
        }

        const deleteCake = await tb_cake.destroy({
            where: { id: req.params.id }
        });

        if (!deleteCake) {
            return res.status(400).json({
                status_code: 400,
                msg: 'An error occurred while deleting cake data'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: `Cake ID: ${req.params.id} deleted successfully`
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
    createCake,
    getCakeInfo,
    getCakeAll,
    searchCake,
    updateCake,
    deleteCake
};
