const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Teacher = db.teacher
const saltRounds = 10

require('dotenv').config({ path: './configt.env' })
const axios = require('axios')

// create teacher
const createTeacher = async (req, res) => {
  const {
    teac_name,
    teac_surname,
    teac_telephone,
    teac_email,
    teac_username,
    teac_password,
    yearlevel_id,
    yearlevel_id2,
    yearlevel_id3
  } = req.body

  try {
    const alreadyExistsEmail = await Teacher.findOne({ where: { teac_email } })
    const alreadyExistsUsername = await Teacher.findOne({
      where: { teac_username }
    })

    if (alreadyExistsEmail) {
      return res.json({ message: 'มีอีเมลล์นี้อยู่แล้ว' })
    }
    if (alreadyExistsUsername) {
      return res.json({ message: 'มีชื่อผู้ใช้งานนี้อยู่แล้ว' })
    }

    const hashedPassword = await bcrypt.hash(teac_password, saltRounds)

    const newTeacher = new Teacher({
      teac_name,
      teac_surname,
      teac_telephone,
      teac_email,
      teac_username,
      teac_password: hashedPassword,
      role: 'teacher',
      yearlevel_id,
      yearlevel_id2,
      yearlevel_id3
    })

    await newTeacher.save()
    return res.status(200).json({ message: 'สร้างอาจารย์สำเร็จ' })
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างอาจารย์' })
  }
}

// login teacher
const loginTeacher = async (req, res) => {
  const { teac_username, teac_password } = req.body
  let whereClause

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(teac_username)) {
    whereClause = { teac_email: teac_username }
  } else {
    whereClause = { teac_username: teac_username }
  }

  try {
    const userWithIdentifier = await Teacher.findOne({
      where: whereClause
    })

    if (!userWithIdentifier) {
      return res
        .status(401)
        .json({ message: 'ชื่อผู้ใช้งาน หรือ อีเมลล์ ไม่ถูกต้อง' })
    }

    const passwordMatch = await bcrypt.compare(
      teac_password,
      userWithIdentifier.teac_password
    )

    if (!passwordMatch) {
      return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
    }

    const jwtToken = jwt.sign(
      {
        id: userWithIdentifier.id,
        teac_email: userWithIdentifier.teac_email,
        teac_username: userWithIdentifier.teac_username,
        role: userWithIdentifier.role
      },
      process.env.JWT_SECRET
    )

    return res.json({
      message: 'ยินดีต้อนรับ',
      username: teac_username,
      role: userWithIdentifier.role,
      token: jwtToken
    })
  } catch (error) {
    console.error('Error: ', error)
    return res.status(500).json({ message: 'มีข้อผิดพลาดในการล็อกอิน' })
  }
}

module.exports = {
  createTeacher,
  loginTeacher
}
