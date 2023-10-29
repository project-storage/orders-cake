const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10
const Teacher = db.teacher
const YearLevel = db.yearlevel

require('dotenv').config({ path: './config.env' })

// create teahcer
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

  const hashedPassword = await bcrypt.hash(teac_password, saltRounds)
  try {
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
