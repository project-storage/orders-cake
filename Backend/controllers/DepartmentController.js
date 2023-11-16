const db = require('../models')
const Department = db.department

// create department
const createDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { department_name } = req.body

    if (!department_name) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลในช่องแผนก' })
    }

    const alreadyExistsDepartment = await Department.findOne({
      where: { department_name: department_name }
    })

    if (alreadyExistsDepartment) {
      return res.status(409).json({ message: 'มีแผนกอยู่แล้ว' })
    }

    const newDepartment = new Department({ department_name: department_name })
    const savedDepartment = await newDepartment.save()

    return res
      .status(200)
      .json({ message: 'สร้างแผนกสำเร็จ', แผนก: savedDepartment })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างแผนก' })
  }
}

// info department
const getInfoDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const department = await Department.findAll({
      where: { id: req.params.id }
    })
    return res.status(200).json({ department })
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก' })
  }
}

// all department
const getAllDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const department = await Department.findAll()
    return res.json(department)
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก' })
  }
}

// search department
const getDepartmentWithAllParams = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id, department_name } = req.query

    const whereClause = {}
    if (id) {
      whereClause.id = id
    }
    if (department_name) {
      whereClause.department_name = department_name
    }

    const department = await Department.findAll({ where: whereClause })
    if (department.length === 0) {
      return res.status(404).json({ message: 'ไม่พบข้อมูล' })
    }

    return res.status(200).json(department)
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก' })
  }
}

// update department
const updateDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id, department_name } = req.body

    const department = await Department.findOne({
      where: { id: req.params.id }
    })

    if (!department) {
      return res.status(404).json({ message: 'ไม่พบแผนก' })
    }

    department.department_name = department_name || department.department_name

    const updatedDepartment = await department.save()

    if (!updatedDepartment) {
      return res.status(400).json({ message: 'ข้อผิดพลาดในการอัปเดตแผนก' })
    }
    console.log(updatedDepartment)
    return res.status(200).json({
      message: 'แผนกอัปเดตเรียบร้อยแล้ว!',
      updatedDepartment: updatedDepartment
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลแผนก' })
  }
}

// delete department
const deleteDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const department = await Department.findOne({
      where: { id: req.params.id }
    })

    if (!department) {
      return res.status(404).json({ message: 'ไม่พบแผนก' })
    }

    const deleteDepartment = await Department.destroy({
      where: { id: req.params.id }
    })

    if (!deleteDepartment) {
      return res.status(400).json({ message: 'เกิดข้อผิดพลาดในการลบแผนก' })
    }

    return res.status(200).json({ message: 'ลบแผนกสำเร็จ' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบแผนก' })
  }
}

module.exports = {
  createDepartment,
  getAllDepartment,
  getDepartmentWithAllParams,
  getInfoDepartment,
  updateDepartment,
  deleteDepartment
}
