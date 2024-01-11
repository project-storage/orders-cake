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
        stuNumber,
        stuIdCard,
        title,
        stuNane,
        stuSurname,
        stuTelephone,
        email,
        username,
        password,
        yearlevel_id,
        depart_id,
        teach_id,
        teach_id2
    } = req.body

    try {
        const alreadyExistsNumber = await Student.findOne({ where: { stuNumber } })
        const alreadyExistsIdCard = await Student.findOne({ where: { stuIdCard } })
        const alreadyExistsEmail = await Student.findOne({ where: { email } })
        const alreadyExistsUsername = await Student.findOne({ where: { username } })
        const alreadyExistsTelephone = await Student.findOne({ where: { stuTelephone } })

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

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newStudnets = new Student({
            title,
            stuNumber,
            stuIdCard,
            stuNane,
            stuSurname,
            stuTelephone,
            email,
            username,
            password: hashedPassword,
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

// info student
const getInfoStudent = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { id: req.user.id },
            include: [
                { model: YearLevel, as: 'yearlevels' },
                { model: Department, as: 'departments' },
                { model: Teacher, as: 'teachers1' },
                { model: Teacher, as: 'teachers2' }
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

// all students
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
                { model: Teacher, as: 'teachers1' },
                { model: Teacher, as: "teachers2" }
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

// search srtudent
const getStudentWithAllParams = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin' && req.user.role !== 'teacher') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { id, stuNumber, stuNane, email, username } = req.query

        const whereClause = {}
        if (id) {
            whereClause.id = id
        }
        if (stuNumber) {
            whereClause.stuNumber = stuNumber
        }
        if (stuNane) {
            whereClause.stuNane = stuNane
        }
        if (id) {
            whereClause.email = email
        }
        if (id) {
            whereClause.username = username
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

// update student 
const updateStudent = async (req, res) => {
    try {
        const {
            stuNumber,
            stuIdCard,
            title,
            stuNane,
            stuSurname,
            stuTelephone,
            email,
            username,
            password,
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
                { model: Teacher, as: 'teachers1' },
                { model: Teacher, as: 'teachers2' }
            ]
        })

        if (!student) {
            return res.status(404).json({ message: "ไม่พบนักศึกษา" })
        }

        if (username !== student.username) {
            const alreadyExistsUsername = await Student.findOne({ where: { username } })

            if (alreadyExistsUsername) {
                return res.status(400).json({ message: "ชื่อผู้ใช้มีอยู่แล้ว" })
            }
        }

        if (email !== student.email) {
            const alreadyExistsEmail = await Student.findOne({ where: { email } })

            if (alreadyExistsEmail) {
                return res.status(400).json({ message: "อีเมลล์ผู้ใช้มีอยู่แล้ว" })
            }
        }

        student.stuNumber = stuNumber || student.stuNumber
        student.stuIdCard = stuIdCard || student.stuIdCard
        student.title = title || student.title
        student.stuNane = stuNane || student.stuNane
        student.stuSurname = stuSurname || student.stuSurname
        student.stuTelephone = stuTelephone || student.stuTelephone
        student.email = email || student.email
        student.username = username || student.username
        student.yearlevel_id = yearlevel_id || student.yearlevel_id
        student.depart_id = depart_id || student.depart_id
        student.teach_id = teach_id || student.teach_id
        student.teach_id2 = teach_id2 || student.teach_id2

        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            student.password = hashedPassword
        }

        const updateStudent = await student.save()

        if (!updateStudent) {
            return res.status(400).json({ message: "เกิดข้อผิดพลาดในการอัปเดทข้อมูลนักศึกษา" })
        }

        return res.status(200).json({ message: "นักศึกษาอัปเดตเรียบร้อยแล้ว", updateStudent })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดทข้อมูลนักศึกษา' })
    }
}

// delete student
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

        return res.status(200).json({ message: "ลบนักศึกษาสำเร็จ" })
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