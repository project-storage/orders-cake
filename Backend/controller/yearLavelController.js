const db = require('../models')
const YearLavel = db.yearlavel
const Department = db.department

// สร้างระดับการศึกษา
const createYearLavel = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { lavel_name, depart_id } = req.body

    if (!lavel_name) {
      return res
        .status(400)
        .json({ message: 'กรุณากรอกข้อมูลในช่องระดับการศึกษา' })
    }
    if (!depart_id) {
      return res.status(400).json({ message: 'กรุณาเลือกแผนก' })
    }

    const alreadyExistsYearLavel = await YearLavel.findOne({
      where: { lavel_name }
    })

    if (alreadyExistsYearLavel) {
      return res.status(409).json({ message: 'มีห้องเรียนอยู่แล้ว' })
    }

    if (isNaN(depart_id)) {
      return res
        .status(404)
        .json({ message: 'depart_id ควรเป็นตัวเลขเท่านั้น' })
    }

    const newYearLavel = new YearLavel({ lavel_name, depart_id })
    const saveYearLavel = await newYearLavel.save()

    return res.status(200).json({
      message: 'สร้างระดับการศึกษาสำเร็จ',
      ระดับการศึกษา: saveYearLavel
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการสร้างระดับการศึกษา' })
  }
}

// get all year lavel
const getAllYearLavel = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const yearlavel = await YearLavel.findAll({
      include: { model: Department, as: 'departments' }
    })

    return res.status(200).json(yearlavel)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลระดับการศึกษา' })
  }
}

// info year lavel
const getInfoYearLavel = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const yearlavel = await YearLavel.findAll({
      where: { id: req.params.id },
      include: { model: Department, as: 'departments' }
    })

    return res.status(200).json(yearlavel)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลระดับการศึกษา' })
  }
}

// search year lavel
const getAllYearLavelWithAllParans = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id, lavel_name, depart_id } = req.body

    const whereClause = {}
    if (!id) {
      whereClause.id = id
    }
    if (!lavel_name) {
      whereClause.lavel_name = lavel_name
    }
    if (!id) {
      whereClause.depart_id = depart_id
    }
  } catch (error) {}
}
