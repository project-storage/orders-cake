const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10
const Teacher = db.teacher
const YearLevel = db.yearlevel

require('dotenv').config({ path: './config.env' })

// register teahcer
const createTeahcer = async (req, res) => {
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
    const alreadyExistsUsername = await Teacher.findOne({ where: { teac_username } })

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
    return res.status(200).json({ message: 'สร้างครูที่ปรึกษาสำเร็จ' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการสร้างครูที่ปรึกษาสำเร็จ' })
  }
}

// login teacher
const loginTeacher = async (req, res) => {
  const { teac_username, teac_password } = req.body
  let whereClause
  try {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(teac_username)) {
      whereClause = { teac_email: teac_username }
    } else {
      whereClause = { teac_username }
    }

    const teacherWithIdentifier = await Teacher.findOne({
      where: whereClause
    })

    if (!teacherWithIdentifier) {
      return res.status(401).json({ message: 'ชื่อผู้ใช้งาน หรือ อีเมลล์ ไม่ถูกต้อง' })
    }

    const passwordMatch = await bcrypt.compare(
      teac_password,
      teacherWithIdentifier.teac_password
    )
    if (!passwordMatch) {
      return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
    }

    const jwtToken = jwt.sign({
      id: teacherWithIdentifier.id,
      teac_email: teacherWithIdentifier.teac_email,
      teac_username: teacherWithIdentifier.teac_username,
      role: teacherWithIdentifier.role
    },
      process.env.JWT_SECRET
    )

    return res.json({
      message: 'ยินดีต้อนรับ',
      email: teacherWithIdentifier.teac_email,
      username: teac_username,
      role: teacherWithIdentifier.role,
      token: jwtToken
    })
  } catch (error) {
    console.error('Error: ', error)
    return res.status(500).json({ message: 'มีข้อผิดพลาดในการล็อกอิน' })
  }
}

// info teacher 
const getinfoTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ where: { id: req.user.id }, include: { model: YearLevel, as: 'yearlevels' } })

    if (!teacher) {
      return res.status(401).json({ message: "ไม่พบข้อมูลผู้ใช้งาน" })
    }

    return res.status(200).json({ teacher })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' })
  }
}

// get all teacher 
const getAllTeacher = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const teacher = await Teacher.findAll({ include: { model: YearLevel, as: 'yearlevels' } })
    if (!teacher) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลครูที่ปรึกษา' })
    }

    return res.status(200).json({ teacher })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลครูที่ปรึกษาทั้งหมด' })
  }
}

// search teacher
const getTeacherWithAllParams = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id, teac_name, teac_surname, teac_email, teac_username, role } = req.query

    const whereClause = {}
    if (id) {
      whereClause.id = id
    }
    if (teac_name) {
      whereClause.teac_name = teac_name
    }
    if (teac_surname) {
      whereClause.teac_surname = teac_surname
    }
    if (teac_email) {
      whereClause.teac_email = teac_email
    }
    if (teac_username) {
      whereClause.teac_username = teac_username
    }
    if (role) {
      whereClause.role = role
    }

    const teacher = await Teacher.findAll({ where: whereClause, include: { model: YearLevel, as: 'yearlevels' } })
    if (teacher.length === 0) {
      return res.status(405).json({ message: "ไม่พบข้อมูลครูที่ปรึกษา" })
    }

    return res.status(200).json(teacher)
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลครูที่ปรึกษา' })
  }
}

// update teacher 
const updateTeacher = async (req, res) => {
  const { teac_name,
    teac_surname,
    teac_telephone,
    teac_email,
    teac_username,
    teac_password,
    yearlevel_id,
    yearlevel_id2,
    yearlevel_id3 } = req.body
  let teacher
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' &&
      req.user.role !== 'superAdmin' &&
      req.user.role !== 'teacher') {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    if (!req.params.id) {
      return res.status(404).json({ message: 'อัปเดตครูที่ปรึกษาต้องระบบ id' })
    }
    teacher = await Teacher.findOne({
      where: { id: req.params.id },
      include: { model: YearLevel, as: 'yearlevels' }
    })

    if (!teacher) {
      return res.status(404).json({ message: 'ไม่พบครูที่ปรึกษา' })
    }
    
    if (teac_username !== teacher.teac_username) {
      const alreadyExistsUser = await Teacher.findOne({ where: { teac_username: teac_username } })

      if (alreadyExistsUser) {
        return res.status(400).json({ message: 'ชื่อผู้ใช้มีอยู่แล้ว' })
      }
    }

    if (teac_email !== teacher.teac_email) {
      const alreadyExistsEmail = await Teacher.findOne({ where: { teac_email: teac_email } })

      if (alreadyExistsEmail) {
        return res.status(400).json({ message: 'อีเมลล์ผู้ใช้มีอยู่แล้ว' })
      }
    }

    teacher.teac_name = teac_name || teacher.teac_name
    teacher.teac_surname = teac_surname || teacher.teac_surname
    teacher.teac_telephone = teac_telephone || teacher.teac_telephone
    teacher.teac_email = teac_email || teacher.teac_email
    teacher.teac_username = teac_username || teacher.teac_username
    teacher.yearlevel_id = yearlevel_id || teacher.yearlevel_id
    teacher.yearlevel_id2 = yearlevel_id2 || teacher.yearlevel_id2
    teacher.yearlevel_id3 = yearlevel_id3 || teacher.yearlevel_id3

    if (teac_password) {
      const hashedPassword = await bcrypt.hash(teac_password, saltRounds)
      teacher.teac_password = hashedPassword
    }

    const updatedTeacher = await teacher.save()

    if (!updatedTeacher) {
      return res.status(400).json({ message: 'ข้อผิดพลาดในการอัปเดตครูที่ปรึกษา' })
    }

    return res.status(200).json({ message: 'ครูที่ปรึกษาอัปเดตเรียบร้อยแล้ว' })
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลครูที่ปรึกษา' })
  }
}
module.exports = {
  createTeahcer,
  loginTeacher,
  getinfoTeacher,
  getAllTeacher,
  getTeacherWithAllParams,
  updateTeacher
}