const db = require('../models');
const Cake = db.cake;

// create cake
const createCake = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { cakeName, pound, price, } = req.body;

        if (!cakeName || !pound || !price) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลทุกช่อง' });
        }

        const newCake = new Cake({ cakeName, pound, price });
        const saveCake = await newCake.save();

        return res.status(200).json({
            message: 'สร้างเค้กสำเร็จ',
            cake: saveCake
        });
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการสร้างข้อมูล' });
    }
}
// Info Cake
const getInfoCake = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cakeById = await Cake.findAll({
            where: { id: req.params.id }
        })

        return res.status(200).json({ message: `ดึงข้อมูล ID: ${req.params.id} สำเร็จ`, cake: cakeById })
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
}

// All Cake
const getAllCake = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const cakeByAll = await Cake.findAll({})

        return res.status(200).json({ CakeAll: cakeByAll })
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
}

// search cake
const getCakeWithAllParmans = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id, cakeName, pound, price } = req.query;

        const whereClause = {};

        if (id) {
            whereClause.id = id;
        }

        if (cakeName) {
            whereClause.cakeName
        }

        if (pound && isNaN(parseFloat(pound))) {
            return res.status(400).json({ message: 'ปอนด์ต้องเป็นตัวเลขเท่านั้น' });
        }

        if (price && isNaN(parseFloat(price))) {
            return res.status(400).json({ message: 'ราคาต้องเป็นตัวเลขเท่านั้น' });
        }

        if (pound) {
            whereClause.pound = pound;
        }

        if (price) {
            whereClause.price = price;
        }

        const cakeQuery = await Cake.findAll({ where: whereClause });

        return res.status(200).json({ query_cake: cakeQuery });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
}

// update cake
const updateCake = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { cakeName, pound, price } = req.body

        const cake = await Cake.findOne({ where: { id: req.params.id } })

        if (!cake) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลเค้ก' })
        }

        cake.cakeName = cakeName || cake.cakeName
        cake.pound = pound || cake.pound
        cake.price = price || cake.price

        const updateCake = await cake.save()

        return res.status(200).json({
            message: 'เค้กอัปเดตเรียบร้อยแล้ว!',
            cake: updateCake
        })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดทข้อมูล' });
    }
}

// delete cake
const deleteCake = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const cake = await Cake.findOne({
            where: { id: req.params.id }
        })

        if (!cake) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลเค้ก' })
        }

        const deleteCake = await Cake.destroy({
            where: { id: req.params.id }
        })

        if (!deleteCake) {
            return res.status(400).json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูลเค้ก' })
        }

        return res.status(200).json({ message: `ลบเค้ก ID: ${req.params.id} สำเร็จ` })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูลเค้ก' })
    }
}

module.exports = {
    createCake,
    getInfoCake,
    getAllCake,
    getCakeWithAllParmans,
    updateCake,
    deleteCake
};
