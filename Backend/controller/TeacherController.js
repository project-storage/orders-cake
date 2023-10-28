const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Teacher = db.teacher
const YearLevel = db.yearlevel
const saltRounds = 10

require('dotenv').config({ path: './configt.env' })

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
      return res.json({ message: 'มีชื่อครูที่ปรึกษานี้อยู่แล้ว' })
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
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการสร้างครูที่ปรึกษา' })
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
        .json({ message: 'ชื่อครูที่ปรึกษา หรือ อีเมลล์ ไม่ถูกต้อง' })
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

// All Teacher
const getAllTeacher = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const teacher = await Teacher.findAll({
      include: { model: YearLevel, as: 'yearlevels' }
    })

    return res.status(200).json(teacher)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลครูที่ปรึกษา' })
  }
}

// info teacher
const getInfoTeacher = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const teacher = await Teacher.findAll({
      where: { id: req.params.id },
      include: { model: YearLevel, as: 'yearlevels' }
    })

    return res.status(200).json(teacher)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลครูที่ปรึกษา' })
  }
}

// search teacher
const getAllTeacherWithAllParams = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id, teac_name, teac_surname, teac_username } = req.body

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
    if (teac_username) {
      whereClause.teac_username = teac_username
    }

    const teacher = await Teacher.findAll({
      where: whereClause,
      include: { model: YearLevel, as: 'yearlevels' }
    })

    if (teacher.length === 0) {
      return res.status(404).json({ message: 'ไม่พบข้อมูล' })
    }

    return res.status(200).json(teacher)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลครูที่ปรึกษา' })
  }
}

// update teacher
const updateTeacher = async (req, res) => {
  try {
    const {
      teac_name,
      teac_surname,
      teac_telephone,
      teac_email,
      teac_username,
      teac_password,
      yearlevel_id,
      yearlevel_i2,
      yearlevel_id3
    } = req.body
    let teacher

    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'superAdmin' &&
      req.teacher.role !== 'teacher'
    ) {
      return res.status(401).json({ message: 'Unauthorized`' })
    }

    if (req.teacher.role === 'teacher') {
      if (!req.params.id) {
        return res
          .status(405)
          .json({ message: 'อัปเดตครูที่ปรึกษาต้องระบุ id' })
      }
      teacher = await Teacher.findOne({ where: { id: req.params.id } })
    }

    if (!teacher) {
      return res.status(404).json({ message: 'ไม่พบครูที่ปรึกษา' })
    }

    if (teac_username !== teacher.teac_username) {
      const alreadyExistsUser = await Teacher.findOne({
        where: { teac_username }
      })

      if (alreadyExistsUser) {
        return res.status(400).json({ message: 'ชื่อครูที่ปรึกษาอยู่แล้ว' })
      }
    }

    if (teac_email !== teacher.teac_email) {
      const alreadyExistsEmail = await Teacher.findOne({
        where: { teac_email }
      })

      if (alreadyExistsEmail) {
        return res
          .status(400)
          .json({ message: 'อีเมลล์ครูที่ปรึกษามีอยู่แล้ว' })
      }
    }

    teacher.teac_name = teac_name || teacher.teac_name
    teacher.teac_surname = teac_surname || teacher.teac_surname
    teacher.teac_telephone = teac_telephone || teacher.teac_telephone
    teacher.teac_email = teac_email || teacher.teac_email
    teacher.teac_username = teac_username || teacher.teac_username
    teacher.yearlevel_id = yearlevel_id || teacher.yearlevel_id
    teacher.yearlevel_i2 = yearlevel_i2 || teacher.yearlevel_i2
    teacher.yearlevel_id3 = yearlevel_id3 || teacher.yearlevel_id3

    if (teac_password) {
      const hashedPassword = await bcrypt.hash(teac_password, saltRounds)
      teacher.teac_password = hashedPassword
    }

    const updateTeacher = await teacher.save()
    if (!updateTeacher) {
      return res
        .status(400)
        .json({ message: 'ข้อผิดพลาดในการอัปเดตครูที่ปรึกษา' })
    }

    return res.json({ message: 'ครูที่ปรึกษาอัปเดตเรียบร้อยแล้ว' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลครูที่ปรึกษา' })
  }
}

// delete teahcer
const deleteTeacher = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const teacher = await Teacher.findOne({ where: { id: req.params.id } })
    if (!teacher) {
      return res
        .status(400)
        .json({ message: 'เกิดข้อผิดพลาดในการลบครูที่ปรึกษา' })
    }

    return res.json({ message: 'ลบครูที่ปรึกษาสำเร็จ' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการลบครูที่ปรึษา' })
  }
}

module.exports = {
  createTeacher,
  loginTeacher,
  getAllTeacher,
  getAllTeacherWithAllParams,
  getInfoTeacher,
  updateTeacher,
  deleteTeacher
}
