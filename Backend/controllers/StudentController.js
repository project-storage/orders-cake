const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10
const Student = db.student
const Teacher = db.teacher
const YearLevel = db.yearlevel
const Department = db.department

require('dotenv').config({ path: './config.env' })

// register student
const createStudent = async (req, res) => {
    const {
        title,
        stu_number,
        stu_Idcard,
        stu_name,
        stu_surname,
        stu_telephone,
        stu_email,
        stu_username,
        stu_password,
        yearlevel_id,
        depart_id,
        teach_id,
        teach_id2
    } = req.body

    try {
        const alreadyExistsNumber = await Student.findOne({ where: { stu_number } })
        const alreadyExistsIdCard = await Student.findOne({ where: { stu_Idcard } })
        const alreadyExistsEmail = await Student.findOne({ where: { stu_email } })
        const alreadyExistsUsername = await Student.findOne({ where: { stu_username } })
        const alreadyExistsTelephone = await Student.findOne({ where: { stu_telephone } })

        if (alreadyExistsNumber) {
            return res.json({ message: 'มีเลขประจำตัวนักศึกษาอยู่แล้ว' })
        }
        if (alreadyExistsIdCard) {
            return res.json({ message: 'มีหมายเลขบัตรประชาชนอยู่แล้ว' })
        }
        if (alreadyExistsEmail) {
            return res.json({ message: 'มีอีเมลล์อยู่แล้ว' })
        }
        if (alreadyExistsUsername) {
            return res.json({ message: 'มีชื่่อผู้ใช้งานอยู่แล้ว' })
        }
        if (alreadyExistsTelephone) {
            return res.json({ message: 'มีหมายเลขโทรศัพท์อยู่แล้ว' })
        }

        const hashedPassword = await bcrypt.hash(stu_password, saltRounds)

        const newStudnets = new Student({
            title,
            stu_number,
            stu_Idcard,
            stu_name,
            stu_surname,
            stu_telephone,
            stu_email,
            stu_username,
            stu_password: hashedPassword,
            role: 'Student',
            yearlevel_id,
            depart_id,
            teach_id,
            teach_id2
        })

        await newStudnets.save()
        return res.status(200).json({ message: 'สร้างนักษศึกษาสำเร็จ' })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างนักศึกษา' })
    }
}

// login student
const loginStudnet = async (req, res) => {
    try {
        const { stu_username, stu_password } = req.body;
        let whereClause;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stu_username)) {
            whereClause = { stu_email: stu_username };
        } else {
            whereClause = { stu_username: stu_username };
        }

        console.error(whereClause)

        const studnetWithIdentifier = await Student.findOne({
            where: whereClause
        }).catch((error) => {
            console.log("Error", error)
        })

        if (!studnetWithIdentifier) {
            return res.status(401).json({ message: "ชื่อผู้ใช้งาน หรือ อีเมลล์ ไม่ถูกต้อง" })
        }

        const passwordMatch = await bcrypt.compare(
            stu_password,
            studnetWithIdentifier.stu_password
        )

        if (!passwordMatch) {
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" })
        }

        const jwtToken = jwt.sign({
            id: studnetWithIdentifier.id,
            stu_email: studnetWithIdentifier.stu_email,
            stu_username: studnetWithIdentifier.stu_username,
            role: studnetWithIdentifier.role
        },
            process.env.JWT_SECRET
        )

        return res.status(200).json({
            message: "ยินดีต้อนรับ",
            email: studnetWithIdentifier.stu_email,
            username: studnetWithIdentifier.stu_username,
            role: studnetWithIdentifier.role,
            token: jwtToken
        })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "มีข้อผิดพลาดในการล็อกอิน" })
    }
}

// info student
const getInfoStudent = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { id: req.user.id },
            include: [
                { model: YearLevel, as: 'yearlevels' },
                { model: Department, as: 'departments' },
                { model: Teacher, as: 'teachers' }
            ]
        })

        if (!student) {
            return res.status(401).json({ message: "ไม่พบข้อมูลผู้ใช้งาน" })
        }
        console.log(req.user.id)
        return res.status(200).json({ student })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา' })
    }
}

const getAllStudent = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin' && req.user.role !== 'teacher') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const student = await Student.findAll({
            include: [
                { model: YearLevel, as: 'yearlevels' },
                { model: Department, as: 'departments' },
                { model: Teacher, as: 'teachers' }
            ]
        })

        if (!student) {
            return res.status(404).json({ message: "ไม่พบข้อมูลนักศึกษา" })
        }

        return res.status(200).json(student)

    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา' })
    }
}

const getStudentWithAllParams = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin' && req.user.role !== 'teacher') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { id, stu_number, stu_name, stu_email, stu_username } = req.query

        const whereClause = {}
        if (id) {
            whereClause.id = id
        }
        if (stu_number) {
            whereClause.stu_number = stu_number
        }
        if (stu_name) {
            whereClause.stu_name = stu_name
        }
        if (id) {
            whereClause.stu_email = stu_email
        }
        if (id) {
            whereClause.stu_username = stu_username
        }

        const student = await Student.findAll({
            where: whereClause
        })

        if (student.length === 0) {
            return res.status(405).json({ message: "ไม่พบข้อมูลนักศึกษา" })
        }

        return res.status(200).json(student)
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา' })
    }
}

const updateStudent = async (req, res) => {
    try {
        const {
            stu_number,
            stu_Idcard,
            title,
            stu_name,
            stu_surname,
            stu_telephone,
            stu_email,
            stu_username,
            stu_password,
            yearlevel_id,
            depart_id,
            teach_id,
            teach_id2
        } = req.body

        let student

        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'teacher' &&
            req.user.role !== 'student'
        ) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        student = await Student.findOne({
            where: { id: req.params.id },
            include: [
                { model: YearLevel, as: 'yearlevels' },
                { model: Department, as: 'departments' },
                { model: Teacher, as: 'teachers' }
            ]
        })

        if (!student) {
            return res.status(404).json({ message: "ไม่พบนักศึกษา" })
        }

        if (stu_username !== student.stu_username) {
            const alreadyExistsUsername = await Student.findOne({ where: { stu_username } })

            if (alreadyExistsUsername) {
                return res.status(400).json({ message: "ชื่อผู้ใช้มีอยู่แล้ว" })
            }
        }

        if (stu_email !== student.stu_email) {
            const alreadyExistsEmail = await Student.findOne({ where: { stu_email } })

            if (alreadyExistsEmail) {
                return res.status(400).json({ message: "อีเมลล์ผู้ใช้มีอยู่แล้ว" })
            }
        }

        student.stu_number = stu_number || student.stu_number
        student.stu_Idcard = stu_Idcard || student.stu_Idcard
        student.title = title || student.title
        student.stu_name = stu_name || student.stu_name
        student.stu_surname = stu_surname || student.stu_surname
        student.stu_telephone = stu_telephone || student.stu_telephone
        student.stu_email = stu_email || student.stu_email
        student.stu_username = stu_username || student.stu_username
        student.yearlevel_id = yearlevel_id || student.yearlevel_id
        student.depart_id = depart_id || student.depart_id
        student.teach_id = teach_id || student.teach_id
        student.teach_id2 = teach_id2 || student.teach_id2

        if (stu_password) {
            const hashedPassword = await bcrypt.hash(stu_password, saltRounds)
            student.stu_password = hashedPassword
        }

        const updateStudent = await Student.save()

        if (!updateStudent) {
            return res.status(400).json({ message: "เกิดข้อผิดพลาดในการอัปเดทข้อมูลนักศึกษา" })
        }

        return res.status(200).json({ message: "นักศึกษาอัปเดตเรียบร้อยแล้ว", updateStudent })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดทข้อมูลนักศึกษา' })
    }
}

const deleteStudent = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const student = await Student.findOne({ where: { id: req.params.id } })
        if (!student) {
            return res.status(404).json({ message: "ไม่พบนักศึกษา" })
        }

        const deleteStudent = await student.destroy()
        if (!deleteStudent) {
            return res.status(400).json({ message: "เกิดข้อผิดพลาดในการลบข้อมูลนักศึกษา" })
        }

        return res.status(200).json({ message: "เกิดข้อผิดพลาดในการลบข้อมูลนักศึกษา" })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูลนักศึกษา' })
    }
}


module.exports = {
    createStudent,
    loginStudnet,
    getInfoStudent,
    getAllStudent,
    getStudentWithAllParams,
    updateStudent,
    deleteStudent
}