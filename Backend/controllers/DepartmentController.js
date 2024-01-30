const db = require('../models')
const Department = db.department

// create department
const createDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { departCode, departName } = req.body

    if (!departName) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลในช่องแผนก' })
    }

    if (!departCode) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลในช่องรหัสแผนก' })
    }

    const alreadyExistsDepartName = await Department.findOne({
      where: { departName: departName }
    })

    const alreadyExistsDepartCode = await Department.findOne({
      where: { departName: departCode }
    })

    if (alreadyExistsDepartName) {
      return res.status(409).json({ message: 'มีแผนกอยู่แล้ว' })
    }

    if (alreadyExistsDepartCode) {
      return res.status(409).json({ message: 'มีรหัสแผนกอยู่แล้ว' })
    }

    if (isNaN(departCode)) {
      return res.status(404).json({ status: 404, message: 'departCode ควรเป็นตัวเลขเท่านั้น' })
    }


    const newDepartment = new Department({ departName, departCode })
    const savedDepartment = await newDepartment.save()

    return res
      .status(200)
      .json({ message: 'สร้างแผนกสำเร็จ', แผนก: savedDepartment })
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างแผนก' })
  }
}

// info department
const getInfoDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const department = await Department.findAll({
      where: { id: req.params.id }
    })
    return res.status(200).json({ department })
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก' })
  }
}

// all department
const getAllDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const department = await Department.findAll()
    return res.status(200).json(department)
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก' })
  }
}

// search department
const getDepartmentWithAllParams = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id, departName, departCode } = req.query

    const whereClause = {}
    if (id) {
      whereClause.id = id
    }
    if (departName) {
      whereClause.departName = departName
    }
    if (departCode) {
      whereClause.departCode = departCode
    }

    const department = await Department.findAll({ where: whereClause })
    if (department.length === 0) {
      return res.status(404).json({ message: 'ไม่พบข้อมูล' })
    }

    return res.status(200).json(department)
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก' })
  }
}

// update department
const updateDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { departName, departCode } = req.body

    const department = await Department.findOne({
      where: { id: req.params.id }
    })

    if (!department) {
      return res.status(404).json({ message: 'ไม่พบแผนก' })
    }

    department.departName = departName || department.departName
    department.departName = departCode || department.departCode

    const updatedDepartment = await department.save()

    if (!updatedDepartment) {
      return res.status(400).json({ message: 'ข้อผิดพลาดในการอัปเดตแผนก' })
    }
    return res.status(200).json({
      message: 'แผนกอัปเดตเรียบร้อยแล้ว!',
      updatedDepartment: updatedDepartment
    })
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลแผนก' })
  }
}

// delete department
const deleteDepartment = async (req, res) => {
  try {
    // ตรวจสอบบทบาทของผู้ใช้
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
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
    console.error("Error", error);
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
