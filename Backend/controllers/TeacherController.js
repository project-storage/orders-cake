const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10
const Teacher = db.teacher
const YearLevel = db.yearlevel
const Department = db.department

require('dotenv').config({ path: './config.env' })

// register teahcer
const createTeahcer = async (req, res) => {
  const {
    title,
    name,
    surname,
    telephone,
    email,
    username,
    password,
    yearlevel_id,
    yearlevel_id2,
    yearlevel_id3
  } = req.body

  try {
    const alreadyExistsEmail = await Teacher.findOne({ where: { email } })
    const alreadyExistsUsername = await Teacher.findOne({ where: { username } })

    if (alreadyExistsEmail) {
      return res.json({ message: 'มีอีเมลล์นี้อยู่แล้ว' })
    }
    if (alreadyExistsUsername) {
      return res.json({ message: 'มีชื่อผู้ใช้งานนี้อยู่แล้ว' })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newTeacher = new Teacher({
      title,
      name,
      surname,
      telephone,
      email,
      username,
      password: hashedPassword,
      role: 'teacher',
      yearlevel_id,
      yearlevel_id2,
      yearlevel_id3
    })

    await newTeacher.save()

    return res.status(200).json({ message: 'สร้างครูที่ปรึกษาสำเร็จ', creaet: newTeacher })
  } catch (error) {
    console.error("Error creating teacher: ", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการสร้างครูที่ปรึกษาสำเร็จ' })
  }
}

// info teacher 
const getinfoTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      where: { id: req.user.id }, include: [
        {
          model: YearLevel, as: 'yearlevel1',
          include: [
            {
              model: Department, as: 'departments'
            }]
        },
        {
          model: YearLevel, as: 'yearlevel2', include: [
            {
              model: Department, as: 'departments'
            }]
        },
        {
          model: YearLevel, as: 'yearlevel3', include: [
            {
              model: Department, as: 'departments'
            }]
        },
      ],
    })

    if (!teacher) {
      return res.status(401).json({ message: "ไม่พบข้อมูลผู้ใช้งาน" })
    }

    return res.status(200).json({ teacher })
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' })
  }
}

// get all teacher 
const getAllTeacher = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const teacher = await Teacher.findAll({
      include: [
        {
          model: YearLevel, as: 'yearlevel1',
          include: [
            {
              model: Department, as: 'departments'
            }]
        },
        {
          model: YearLevel, as: 'yearlevel2', include: [
            {
              model: Department, as: 'departments'
            }]
        },
        {
          model: YearLevel, as: 'yearlevel3', include: [
            {
              model: Department, as: 'departments'
            }]
        },
      ],
    })
    if (!teacher) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลครูที่ปรึกษา' })
    }

    return res.status(200).json({ teacher })
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลครูที่ปรึกษาทั้งหมด' })
  }
}

// search teacher
const getTeacherWithAllParams = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id, teachName, teachSurname, email, username, role } = req.query

    const whereClause = {}
    if (id) {
      whereClause.id = id
    }
    if (teachName) {
      whereClause.teachName = teachName
    }
    if (teachSurname) {
      whereClause.teachSurname = teachSurname
    }
    if (email) {
      whereClause.email = email
    }
    if (username) {
      whereClause.username = username
    }
    if (role) {
      whereClause.role = role
    }

    const teacher = await Teacher.findAll({
      where: whereClause, include: [
        {
          model: YearLevel, as: 'yearlevel1',
          include: [
            {
              model: Department, as: 'departments'
            }]
        },
        {
          model: YearLevel, as: 'yearlevel2', include: [
            {
              model: Department, as: 'departments'
            }]
        },
        {
          model: YearLevel, as: 'yearlevel3', include: [
            {
              model: Department, as: 'departments'
            }]
        },
      ],
    })
    if (teacher.length === 0) {
      return res.status(405).json({ message: "ไม่พบข้อมูลครูที่ปรึกษา" })
    }

    return res.status(200).json(teacher)
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลครูที่ปรึกษา' })
  }
}

// update teacher 
const updateTeacher = async (req, res) => {
  const {
    teachName,
    teachSurname,
    teachTelephone,
    email,
    username,
    password,
    yearlevel_id,
    yearlevel_id2,
    yearlevel_id3
  } = req.body

  let teacher

  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' &&
      req.user.role !== 'superAdmin' &&
      req.user.role !== 'teacher') {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    if (!req.params.id) {
      return res.status(404).json({ message: 'อัปเดตครูที่ปรึกษาต้องระบบ id' })
    }
    teacher = await Teacher.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: YearLevel, as: 'yearlevel1',
          include: [
            {
              model: Department, as: 'departments'
            }]
        },
        {
          model: YearLevel, as: 'yearlevel2',
          include: [
            {
              model: Department, as: 'departments'
            }]
        },
        {
          model: YearLevel, as: 'yearlevel3',
          include: [
            {
              model: Department, as: 'departments'
            }]
        },
      ],
    })

    if (!teacher) {
      return res.status(404).json({ message: 'ไม่พบครูที่ปรึกษา' })
    }

    if (username !== teacher.username) {
      const alreadyExistsUser = await Teacher.findOne({ where: { username: username } })

      if (alreadyExistsUser) {
        return res.status(400).json({ message: 'ชื่อผู้ใช้มีอยู่แล้ว' })
      }
    }

    if (email !== teacher.email) {
      const alreadyExistsEmail = await Teacher.findOne({ where: { email: email } })

      if (alreadyExistsEmail) {
        return res.status(400).json({ message: 'อีเมลล์ผู้ใช้มีอยู่แล้ว' })
      }
    }

    teacher.teachName = teachName || teacher.teachName
    teacher.teachSurname = teachSurname || teacher.teachSurname
    teacher.teachTelephone = teachTelephone || teacher.teachTelephone
    teacher.email = email || teacher.email
    teacher.username = username || teacher.username
    teacher.yearlevel_id = yearlevel_id || teacher.yearlevel_id
    teacher.yearlevel_id2 = yearlevel_id2 || teacher.yearlevel_id2
    teacher.yearlevel_id3 = yearlevel_id3 || teacher.yearlevel_id3

    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      teacher.password = hashedPassword
    }

    const updatedTeacher = await teacher.save()

    if (!updatedTeacher) {
      return res.status(400).json({ message: 'ข้อผิดพลาดในการอัปเดตครูที่ปรึกษา' })
    }

    return res.status(200).json({ message: 'ครูที่ปรึกษาอัปเดตเรียบร้อยแล้ว' })
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลครูที่ปรึกษา' })
  }
}

// delete teacher
const deleteTeacher = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const teacher = await Teacher.findOne({ where: { id: req.params.id } })
    if (!teacher) {
      return res.status(404).json({ message: 'ไม่พบครูที่ปรึกษา' })
    }

    const deletedTeacher = await teacher.destroy()
    if (!deletedTeacher) {
      return res.status(400).json({ message: 'เกิดข้อผิดพลาดในการลบครูที่ปรึกษา' })
    }

    return res.status(200).json({ message: "ลบข้อมูลสำเร็จ" })
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบครูที่ปรึกษา' })
  }
}
module.exports = {
  createTeahcer,
  loginTeacher,
  getinfoTeacher,
  getAllTeacher,
  getTeacherWithAllParams,
  updateTeacher,
  deleteTeacher
}