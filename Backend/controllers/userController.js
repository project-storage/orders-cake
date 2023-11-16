const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10

const User = db.user

require('dotenv').config({ path: './config.env' })

// create super admin
const createSuperAdminUser = async (req, res) => {
  try {
    const { title, name, surname, username, password } = req.body

    if (!name || !surname || !username || !password) {
      return res.status(400).status({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // create the admin user
    const newsupperAdminUser = new User({
      title,
      name,
      surname,
      username,
      password: hashedPassword,
      role: 'superAdmin'
    })

    await newsupperAdminUser.save()
    return res.status(200).json({ message: 'สร้างซุปเปอร์แอดมินสำเร็จ' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการสร้างซุปเปอร์แอดมิน' })
  }
}

// create admin
const createAdminUser = async (req, res) => {
  try {
    const { title, name, surname, username, password } = req.body

    if (!name || !surname || !username || !password) {
      return res.status(400).status({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // create the admin user
    const newAdminUser = new User({
      title,
      name,
      surname,
      username,
      password: hashedPassword,
      role: 'Admin'
    })

    await newAdminUser.save()
    return res.status(200).json({ message: 'สร้างแอดมินสำเร็จ' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการสร้างแอดมิน' })
  }
}

// register
const registerUser = async (req, res) => {
  try {
    const { title, name, surname, telephone, email, username, password, role } = req.body

    if (!title || !name || !surname || !telephone || !email || !username || !password || !role) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลทุกช่อง' });
    }

    // Check if email or username already exists
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
          title,
          name,
          surname,
          telephone,
          email,
          username,
          password: hashedPassword,
          role
        })

        await newUser.save()
        return res.status(200).json({ message: 'สร้างผู้ใช้งานสำเร็จ', user: newUser })
      }
    } else {
      return res.status(403).json({ message: 'คุณไม่มีสิทธิ์สร้างผู้ใช้งาน' })
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
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน' });
    }

    let whereClause

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
      whereClause = { email: username }
    } else {
      whereClause = { username: username }
    }

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
      process.env.JWT_SECRET
    )

    return res.status(200).json({
      message: 'ยินดีต้อนรับ',
      username: username,
      role: userWithIdentifier.role,
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
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error retrieving user info:', error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' });
  }
};

// get all user
const getAllUser = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // ค้นหาผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await User.findAll()

    return res.status(200).json(users)
  } catch (error) {
    console.error('Error', error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ทั้งหมด' })
  }
}

// search users
const getUserWithAllParams = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // ตรวจสอบค่า userId ที่รับมาจากพารามิเตอร์ของ URL
    const { id, name, surname, telephone, email, username, role } = req.query

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
    if (email) {
      whereClause.email = email
    }
    if (username) {
      whereClause.username = username
    }
    if (telephone) {
      whereClause.telephone = telephone
    }
    if (role) {
      whereClause.role = role
    }

    // ทำคำสั่งค้นหาในฐานข้อมูล
    const users = await User.findAll({ where: whereClause })
    if (users.length === 0) {
      return res.status(405).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' })
    }
    return res.status(200).json(users)
  } catch (error) {
    console.error('Error', error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน' })
  }
}

// update user
const updateUser = async (req, res) => {
  try {
    const { title, name, surname, username, email, password, telephone } = req.body
    let user

    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
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

    user.title = title || user.title
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

    return res.status(200).json({ message: 'ผู้ใช้อัปเดตเรียบร้อยแล้ว' })
  } catch (error) {
    console.error('Error', error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน' })
  }
}

// delete user
const deleteUser = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
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

    return res.status(200).json({ message: 'ลบข้อผู้ใช้งานสำเร็จ' })
  } catch (error) {
    console.error('Error', error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบผู้ใช้งาน' })
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
  deleteUser
}
