const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10

const User = db.user
const Teacher = db.teacher

require('dotenv').config({ path: './configt.env' })
const axios = require('axios')

// create super admin
const createSuperAdminUser = async (req, res) => {
  const { name, surname, username, password } = req.body

  // hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  // create the admin user
  const newAdminUser = new User({
    name,
    surname,
    username,
    password: hashedPassword,
    role: 'superAdmin'
  })

  try {
    await newAdminUser.save()
    return res.json({ message: 'สร้างซุปเปอร์แอดมินสำเร็จ' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างแอดมิน' })
  }
}

// create admin
const createAdminUser = async (req, res) => {
  const { name, surname, username, password } = req.body

  // hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  // create the admin user
  const newAdminUser = new User({
    name,
    surname,
    username,
    password: hashedPassword,
    role: 'admin'
  })

  try {
    await newAdminUser.save()
    return res.json({ message: 'สร้างแอดมินสำเร็จ' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างแอดมิน' })
  }
}

// register
const registerUser = async (req, res) => {
  const { name, surname, telephone, email, username, password, role } = req.body

  try {
    const alreadyExistsEmail = await User.findOne({ where: { email } })
    const alreadyExistsUsername = await User.findOne({ where: { username } })

    if (alreadyExistsEmail) {
      return res.json({ message: 'มีอีเมลล์นี้อยู่แล้ว' })
    }
    if (alreadyExistsUsername) {
      return res.json({ message: 'มีชื่อผู้ใช้งานนี้อยู่แล้ว' })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
      if (role === 'DepatMoney' || role === 'DepatCake') {
        const newUser = new User({
          name,
          surname,
          telephone,
          email,
          username,
          password: hashedPassword,
          role
        })

        await newUser.save()
        return res.json({ message: 'สร้างผู้ใช้งานสำเร็จ' })
      }
    } else {
      return res.json({ message: 'คุณไม่มีสิทธิ์สร้างผู้ใช้งาน' })
    }
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้งาน' })
  }
}

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body
  let whereClause

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
    whereClause = { email: username }
  } else {
    whereClause = { username: username }
  }

  try {
    const userWithIdentifier = await User.findOne({
      where: whereClause
    })

    if (!userWithIdentifier) {
      return res
        .status(401)
        .json({ message: 'ชื่อผู้ใช้งาน หรือ อีเมลล์ ไม่ถูกต้อง' })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userWithIdentifier.password
    )

    if (!passwordMatch) {
      return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
    }

    const jwtToken = jwt.sign(
      {
        id: userWithIdentifier.id,
        email: userWithIdentifier.email,
        username: userWithIdentifier.username,
        role: userWithIdentifier.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h' // ตั้งเวลาในการหมดอายุของโทเคน
      }
    )

    return res.json({
      message: 'ยินดีต้อนรับ',
      username: username,
      token: jwtToken
    })
  } catch (error) {
    console.error('Error: ', error)
    return res.status(500).json({ message: 'มีข้อผิดพลาดในการล็อกอิน' })
  }
}

// get user info
const getUserInfo = async (req, res) => {
  try {
    // ตรวจสอบการตรวจสอบของผู้ใช้จากการยืนยัน Token
    const token = req.headers.authorization
    if (token) {
      return res.status(401).json({ message: 'ไม่พบ Token' })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token ไม่ถูกต้อง' })
      }

      const user = await User.findByPk(decoded.id)
      if (!user) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' })
      }

      // ส่งข้อมูลผู้ใช้งานกลับ
      res.json({
        id: user.id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        role: user.role
      })
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' })
  }
}

// get all user
const getAllUser = async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    // ค้นหาผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await User.findAll()

    return res.json(users)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ทั้งหมด' })
  }
}

// search users
const getUserWithAllParams = async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // ตรวจสอบค่า userId ที่รับมาจากพารามิเตอร์ของ URL
    const { id, name, surname, telephone, role } = req.query

    // สร้างอ็อบเจ็กต์ที่ใช้เก็บเงื่อนไขในการค้นหา
    const whereClause = {}
    if (id) {
      whereClause.id = id
    }
    if (name) {
      whereClause.name = name
    }
    if (surname) {
      whereClause.surname = surname
    }
    if (telephone) {
      whereClause.telephone = telephone
    }
    if (role) {
      whereClause.role = role
    }

    // ทำคำสั่งค้นหาในฐานข้อมูล
    const users = await User.findAll({ where: whereClause })
    return res.json(users)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน' })
  }
}

// update user
const updateUser = async (req, res) => {
  try {
    const { name, surname, username, email, password, telephone } = req.body
    let user

    if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (
      req.user.role === 'superAdmin' ||
      req.user.role === 'admin' ||
      req.user.role === 'DepatMoney' ||
      req.user.role === 'DepatCake'
    ) {
      if (!req.params.id) {
        return res.status(405).json({ message: 'อัปเดตผู้ใช้ต้องระบุ id' })
      }
      user = await User.findOne({ where: { id: req.params.id } })
    }

    if (!user) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' })
    }

    if (username !== user.username) {
      const alreadyExistsUser = await User.findOne({ where: { username } })

      if (alreadyExistsUser) {
        return res.status(400).json({ message: 'ชื่อผู้ใช้มีอยู่แล้ว' })
      }
    }

    if (email !== user.email) {
      const alreadyExistsEmail = await User.findOne({ where: { email } })

      if (alreadyExistsEmail) {
        return res.status(400).json({ message: 'อีเมลล์ผู้ใช้มีอยู่แล้ว' })
      }
    }

    user.name = name || user.name
    user.surname = surname || user.surname
    user.email = email || user.email
    user.telephone = telephone || user.telephone
    user.username = username || user.username

    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      user.password = hashedPassword
    }

    const updatedUser = await user.save()

    if (!updatedUser) {
      return res.status(400).json({ message: 'ข้อผิดพลาดในการอัปเดตผู้ใช้' })
    }

    return res.json({ message: 'ผู้ใช้อัปเดตเรียบร้อยแล้ว' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน' })
  }
}

// delete user
const deleteUser = async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findOne({ where: { id: req.params.id } })
    if (!user) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' })
    }

    const deletedUser = await user.destroy()
    if (!deletedUser) {
      return res.status(400).json({ message: 'เกิดข้อผิดพลาดในการลบผู้ใช้งาน' })
    }

    return res.json({ message: 'ลบข้อผู้ใช้งานสำเร็จ' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบผู้ใช้งาน' })
  }
}

// create teacher
const createTeacher = async (req, res) => {
  const {
    teac_name,
    teac_surname,
    teac_telephone,
    teac_email,
    teac_username,
    teac_password,
    role
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

    if (req.user.role === 'admin') {
      if (role === 'teacher') {
        const newTeacher = new Teac({
          name: teac_name,
          surname: teac_surname,
          telephone: teac_telephone,
          email: teac_email,
          username: teac_username,
          password: hashedPassword,
          role
        })

        await newTeacher.save()
        return res.json({ message: 'สร้างผู้ใช้งานสำเร็จ' })
      }
    } else {
      return res.json({ message: 'คุณไม่มีสิทธิ์สร้างผู้ใช้งาน' })
    }
  } catch (error) {
    console.error(error)
    return res.json({ message: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้งาน' })
  }
}

module.exports = {
  createSuperAdminUser,
  createAdminUser,
  registerUser,
  loginUser,
  getUserInfo,
  getAllUser,
  getUserWithAllParams,
  updateUser,
  deleteUser,
  createTeacher
}
