const db = require('../models')
const Branch = db.branch
const Department = db.department

// create branch
const createBranch = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { branchName, departID } = req.body

        const newBranch = new Branch({ branchName, departID })
        const saveBranch = await newBranch.save()

        return res.json({ status: "200", message: "สร้างสาขาวิชาสำเร็จ", data: saveBranch })
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการสร้างสาขาวิชา' })
    }
}

// get all branch
const getAllBranchs = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const branchs = await Branch.findAll({
            include: { model: Department, as: "departments" }
        })

        return res.status(200).json({ status: "200", message: "get all brabch success", data: branchs })
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสาขาวิชา' })
    }
}

// search branch
const getAllBranchWithAllParams = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { id, branchName, departID } = req.query

        const whereClause = {}
        if (id) {
            whereClause.id = id
        }
        if (branchName) {
            whereClause.branchName = branchName
        }
        if (departID) {
            whereClause.departID = departID
        }

        const branch = await Branch.findAll({
            where: whereClause, include: { model: Department, as: "departments" }
        })

        if (branch.length === 0) {
            return res.status(404).json({ status: "404", message: "ไม่พบข้อมูล" })
        }

        return res.status(200).json({ stastus: "200", data: branch })
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสาขาวิชา' })
    }
}

// update branch
const updateBranch = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { branchName, departID } = req.body

        const branch = await Branch.findOne({
            where: { id: req.params.id },
            include: { model: Department, as: "departments" }
        })

        if (!branch) {
            return res.status(404).json({ status: "404", message: "ไม่พบข้อมูลสาขาวิชา" })
        }

        branch.branchName = branchName || branch.branchName
        branch.departID = departID || branch.departID

        const updateBranch = await branch.save()
        if (!updateBranch) {
            return res.status(400).json({ status: "400", message: "ข้อผิลพลาดในการอัปเดตสาขาวิชา" })
        }

        return res.status(200).json({ status: "200", message: "update success", data: updateBranch })
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลสาขาวิชา' })
    }
}

// delete branch
const deleteBranch = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { id } = req.body

        const branch = await Branch.findOne({ where: { id: req.params.id } })
        if (!branch) {
            return res.status(404).json({ status: "404", message: "ไม่พบข้อมูลสาขาวิชา" })
        }

        const deleteBranch = await branch.destroy()
        if (!deleteBranch) {
            return res.status(400).json({ status: "400", message: "ไม่พบข้อมูลสาขาวิชา" })
        }

        return res.status(200).json({ status: "200", message: `delete ID: ${req.params.id} success` })
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูลสาขาวิชา' })
    }
}
module.exports = {
    createBranch,
    getAllBranchs,
    getAllBranchWithAllParams,
    updateBranch,
    deleteBranch
}