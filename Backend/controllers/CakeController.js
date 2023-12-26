const db = require('../models');
const Cake = db.cake;

const multer = require('multer');
const path = require('path');

// create cake
const createCake = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        console.log(req.body)
        console.log(req.file)
        const { cakeName, pound, price, } = req.body;

        if (!cakeName || !pound || !price) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลทุกช่อง' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'กรุณาเลือกไฟล์รูปภาพ' });
        }

        const alreadyExistsCakeName = await Cake.findOne({ where: { cakeName: cakeName } });

        if (alreadyExistsCakeName) {
            return res.status(409).json({ message: 'มีชื่อเค้กนี้อยู่แล้ว' });
        }

        const newCake = new Cake({ cakeName, pound, price, image: req.file.buffer });
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeTypes = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeTypes && extname) {
            return cb(null, true);
        }
        cb('ให้รูปแบบไฟล์ที่เหมาะสมเพื่ออัปโหลด');
    }
}).single('image');

module.exports = {
    createCake,
    upload
};
