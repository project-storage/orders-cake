const db = require('../models');
const Cake = db.cake;

// Create a new cake
const createCake = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { cakeName, pound, price } = req.body;

        // if (!cakeName || !pound || !price) {
        //     return res.status(400).json({ message: 'Please fill in all fields' });
        // }

        const newCake = new Cake({ cakeName, pound, price });
        const saveCake = await newCake.save();

        return res.status(200).json({
            status_code: 200,
            message: 'Cake created successfully',
            cake: saveCake
        });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while creating data' });
    }
};

// Get information about a specific cake
const getInfoCake = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cakeById = await Cake.findAll({
            where: { id: req.params.id }
        });

        return res.status(200).json({ status_code: 200, message: `Retrieve data for ID: ${req.params.id} successful`, data: cakeById });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while retrieving data' });
    }
};

// Get all cakes
const getAllCakes = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cakeByAll = await Cake.findAll({});

        return res.status(200).json({ status_code: 200, message: "Get all data cake success", data: cakeByAll });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while retrieving data' });
    }
};

// Search for cakes with specified parameters
const getCakeWithAllParams = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id, cakeName } = req.query;

        const whereClause = {};

        if (id) {
            whereClause.id = id;
        }

        if (cakeName) {
            whereClause.cakeName = cakeName;
        }

        const cakeQuery = await Cake.findAll({ where: whereClause });

        return res.status(200).json({ status_code: 200, query_cake: cakeQuery });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while retrieving data' });
    }
};

// Update cake information
const updateCake = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { cakeName, pound, price } = req.body;

        const cake = await Cake.findOne({ where: { id: req.params.id } });

        if (!cake) {
            return res.status(404).json({ message: 'Cake data not found' });
        }

        cake.cakeName = cakeName || cake.cakeName;
        cake.pound = pound || cake.pound;
        cake.price = price || cake.price;

        const updateCake = await cake.save();

        return res.status(200).json({
            status_code: 200,
            message: 'Cake updated successfully!',
            updataCake: updateCake
        });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while updating data' });
    }
};

// Delete a cake
const deleteCake = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cake = await Cake.findOne({
            where: { id: req.params.id }
        });

        if (!cake) {
            return res.status(404).json({ message: 'Cake data not found' });
        }

        const deleteCake = await Cake.destroy({
            where: { id: req.params.id }
        });

        if (!deleteCake) {
            return res.status(400).json({ message: 'An error occurred while deleting cake data' });
        }

        return res.status(200).json({ status_code: 200, message: `Cake ID: ${req.params.id} deleted successfully` });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while deleting cake data' });
    }
};

module.exports = {
    createCake,
    getInfoCake,
    getAllCakes,
    getCakeWithAllParams,
    updateCake,
    deleteCake
};
