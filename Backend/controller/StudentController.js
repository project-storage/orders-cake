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
        stu_number,
        stu_IdCard,
        stu_name,
        stu_surname,
        stu_telephone,
        stu_email,
        stu_username,
        stu_password,
        yearlevel_id,
        department_id,
        teacher_id,
        teacher_id2 } = req.body
    try {
        const alreadyExistsNumber = await Student.findOne({ where: { stu_number } })
        const alreadyExistsIdCard = await Student.findOne({ where: { stu_IdCard } })
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
            stu_number,
            stu_IdCard,
            stu_name,
            stu_surname,
            stu_telephone,
            stu_email,
            stu_username,
            stu_password: hashedPassword,
            role: 'Student',
            yearlevel_id,
            department_id,
            teacher_id,
            teacher_id2
        })

        await newStudnets.save()
        return res.status(200).json({ message: 'สร้างนักษศึกษาสำเร็จ' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างนักศึกษา' })
    }
}



module.exports = {
    createStudent
}