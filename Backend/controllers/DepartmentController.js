const db = require('../models');
const Department = db.department;

// Create department
const createDepartment = async (req, res) => {
  try {
    // Check user roles
    if (req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { departCode, departName } = req.body;

    if (!departName) {
      return res.status(400).json({ message: 'Please enter department information' });
    }

    if (!departCode) {
      return res.status(400).json({ message: 'Please enter department code' });
    }

    const alreadyExistsDepartName = await Department.findOne({
      where: { departName: departName }
    });

    const alreadyExistsDepartCode = await Department.findOne({
      where: { departCode: departCode }
    });

    if (alreadyExistsDepartName) {
      return res.status(409).json({ status_code: 409, message: 'Department already exists' });
    }

    if (alreadyExistsDepartCode) {
      return res.status(409).json({ status_code: 409, message: 'Department code already exists' });
    }

    if (isNaN(departCode)) {
      return res.status(404).json({ status_code: 404, message: 'departCode should be a number' });
    }

    const newDepartment = new Department({ departName, departCode });
    const savedDepartment = await newDepartment.save();

    return res
      .status(200)
      .json({ status_code: 200, message: 'Department created successfully', data: savedDepartment });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'An error occurred while creating department' });
  }
};

// Info department
const getInfoDepartment = async (req, res) => {
  try {
    // Check user roles
    if (req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const department = await Department.findAll({
      where: { id: req.params.id }
    });

    return res.status(200).json({ status_code: 200, message: "Get info data department success", data: department });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'An error occurred while fetching department data' });
  }
};

// All departments
const getAllDepartment = async (req, res) => {
  try {
    // Check user roles
    if (req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const departments = await Department.findAll();

    return res.status(200).json({ status_code: 200, message: "Get All department success", data: departments });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'An error occurred while fetching department data' });
  }
};

// Search department
const getDepartmentWithAllParams = async (req, res) => {
  try {
    // Check user roles
    if (req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id, departName, departCode } = req.query;

    const whereClause = {};
    if (id) {
      whereClause.id = id;
    }
    if (departName) {
      whereClause.departName = departName;
    }
    if (departCode) {
      whereClause.departCode = departCode;
    }

    const departments = await Department.findAll({ where: whereClause });

    if (departments.length === 0) {
      return res.status(404).json({ status_code: 404, message: 'No data found' });
    }

    return res.status(200).json({ status_code: 200, data: departments });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'An error occurred while fetching department data' });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  try {
    // Check user roles
    if (req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { departName, departCode } = req.body;

    const department = await Department.findOne({
      where: { id: req.params.id }
    });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    department.departName = departName || department.departName;
    department.departCode = departCode || department.departCode;

    const updatedDepartment = await department.save();

    if (!updatedDepartment) {
      return res.status(400).json({ message: 'Error updating department' });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Department updated successfully!',
      updatedDepartment: updatedDepartment
    });
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ message: 'An error occurred while updating department data' });
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  try {
    // Check user roles
    if (req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const department = await Department.findOne({
      where: { id: req.params.id }
    });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const deleteDepartment = await Department.destroy({
      where: { id: req.params.id }
    });

    if (!deleteDepartment) {
      return res.status(400).json({ message: 'Error deleting department' });
    }

    return res.status(200).json({ status_code: 200, message: 'Department deleted successfully' });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: 'An error occurred while deleting department' });
  }
};

module.exports = {
  createDepartment,
  getAllDepartment,
  getDepartmentWithAllParams,
  getInfoDepartment,
  updateDepartment,
  deleteDepartment
};
