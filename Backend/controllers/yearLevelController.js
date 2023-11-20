const db = require('../models')
const Yearlevel = db.yearlevel
const Department = db.department

// สร้างระดับการศึกษา
const createYearlevel = async (req, res) => {
  try {
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { level_name, depart_id } = req.body

    if (!level_name) {
      return res
        .status(400)
        .json({ message: 'กรุณากรอกข้อมูลในช่องระดับการศึกษา' })
    }

    if (!depart_id) {
      return res.status(400).json({ message: 'กรุณาเลือกแผนก' })
    }

    // const alreadyExistsYearlevel = await Yearlevel.findOne({
    //   where: { level_name }
    // })

    // if (alreadyExistsYearlevel) {
    //   return res.status(409).json({ message: 'มีห้องเรียนอยู่แล้ว' })
    // }

    if (isNaN(depart_id)) {
      return res
        .status(404)
        .json({ message: 'depart_id ควรเป็นตัวเลขเท่านั้น' })
    }

    const newYearlevel = new Yearlevel({ level_name, depart_id })
    const saveYearlevel = await newYearlevel.save()

    return res.status(200).json({
      message: 'สร้างระดับการศึกษาสำเร็จ',
      ระดับการศึกษา: saveYearlevel
    })
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการสร้างระดับการศึกษา' })
  }
}

// get all year level
const getAllYearlevel = async (req, res) => {
  try {
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const yearlevel = await Yearlevel.findAll({
      include: { model: Department, as: 'departments' }
    })

    return res.status(200).json(yearlevel)
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลระดับการศึกษา' })
  }
}

// info year level
const getInfoYearlevel = async (req, res) => {
  try {
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const yearlevel = await Yearlevel.findAll({
      where: { id: req.params.id },
      include: { model: Department, as: 'departments' }
    })

    return res.status(200).json(yearlevel)
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลระดับการศึกษา' })
  }
}

// search year level
const getAllYearlevelWithAllParans = async (req, res) => {
  try {
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id, level_name, depart_id } = req.query // เปลี่ยนจาก req.body เป็น req.query

    const whereClause = {}
    if (id) {
      whereClause.id = id
    }
    if (level_name) {
      whereClause.level_name = level_name
    }
    if (depart_id) {
      whereClause.depart_id = depart_id
    }

    const yearlevel = await Yearlevel.findAll({
      where: whereClause,
      include: { model: Department, as: 'departments' }
    })

    if (yearlevel.length === 0) {
      return res.status(404).json({ message: 'ไม่พบข้อมูล' })
    }

    return res.status(200).json(yearlevel)
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลระดับการศึกษา' })
  }
}

// update year level
const updateYearlevel = async (req, res) => {
  try {
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized`' })
    }

    const { id, level_name, depart_id } = req.body

    const yearlevel = await Yearlevel.findOne({
      where: { id: req.params.id }
    })

    if (!yearlevel) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลระดับการศึกษา' })
    }

    yearlevel.level_name = level_name || yearlevel.level_name
    yearlevel.depart_id = depart_id || yearlevel.depart_id

    const updatedYearlevel = await yearlevel.save()
    if (!updatedYearlevel) {
      return res.status(400).json({ message: 'ข้อผิดพลาดในการอัปเดตแผนก' })
    }

    return res.status(200).json({
      message: 'ระดับการศึกษาอัปเดตเรียบร้อยแล้ว',
      ระดับการศึกษา: updatedYearlevel
    })
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลระดับการศึกษา' })
  }
}

// delete year level
const deleteYearlevel = async (req, res) => {
  try {
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized`' })
    }

    const yearlevel = await Yearlevel.findOne({ where: { id: req.params.id } })
    if (!yearlevel) {
      return res.status(404).json({ message: 'ไม่พบระดับการศึกษา' })
    }

    const deleteYearlevel = await yearlevel.destroy()
    if (!deleteYearlevel) {
      return res
        .status(400)
        .json({ message: 'เกิดข้อผิดพลาดในการลบระดับการศึกษา' })
    }

    return res.status(200).json({ message: 'ลบระดับการศึกษาสำเร็จ' })
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการลบระดับการศึกษา' })
  }
}

module.exports = {
  createYearlevel,
  getAllYearlevel,
  getAllYearlevelWithAllParans,
  getInfoYearlevel,
  updateYearlevel,
  deleteYearlevel
}
