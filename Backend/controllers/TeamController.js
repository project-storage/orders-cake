const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 10
const TeamUse = db.teamUse

// register team
const createTeam = async (req, res) => {
    try {
        const {
            team_type,
            team_name,
            team_username,
            team_password,
            team_telephone,
            member1,
            member2,
            member3,
            member4,
            member5
        } = req.body

        const alreadyExistsTeamNmae = await TeamUse.findOne({ where: { team_name } })
        const alreadyExistsUsername = await TeamUse.findOne({ where: { team_username } })
        const alreadyExistsTelephone = await TeamUse.findOne({ where: { team_telephone } })

        if (alreadyExistsTeamNmae) {
            return res.json({ message: 'มีชื่อทีมนี้อยู่แล้ว' })
        }
        if (alreadyExistsTelephone) {
            return res.json({ message: 'มีเบอร์โทรอยู่แล้ว' })
        }
        if (alreadyExistsUsername) {
            return res.json({ message: 'มีชื่อผู้ใช้งานนี้อยู่แล้ว' })
        }

        const hashedPassword = await bcrypt.hash(team_password, saltRounds)

        const newTeame = new TeamUse({
            team_type,
            team_name,
            team_username,
            team_password: hashedPassword,
            team_telephone,
            member1,
            member2,
            member3,
            member4,
            member5,
            role: "team"
        })

        await newTeame.save()
        return res.status(200).json({ message: 'สร้างทีมสำเร็จ' })
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ message: "เกิดข้อผิลพลาดในการสร้าง ทีม" })
    }
}

// login 
const loginTeam = async (req, res) => {
    try {
        const { team_username, team_password } = req.body
        let whereClause

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(team_username)) {
            whereClause = { team_username: team_username }
        }

        const TeamWithIdentifier = await TeamUse.findOne({
            where: whereClause
        })

        if (!TeamWithIdentifier) {
            return res.status(401).json({ message: " 'ชื่อผู้ใช้งานไม่ถูกต้อง'" })
        }

        const passwordMatch = await bcrypt.compare(
            team_password,
            TeamWithIdentifier.team_password
        )

        if (!passwordMatch) {
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" })
        }

        const jwtToken = jwt.sign({
            id: TeamWithIdentifier.id,
            type: TeamWithIdentifier.team_type,
            team_name: TeamWithIdentifier.team_name,
            username: TeamWithIdentifier.team_username,
            role: TeamWithIdentifier.role
        },
            process.env.JWT_SECRET
        )

        return res.status(200).json({
            message: 'ยินดีต้อนรับ',
            type: TeamWithIdentifier.team_type,
            team_name: TeamWithIdentifier.team_name,
            username: team_username,
            role: TeamWithIdentifier.role,
            token: jwtToken
        })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในการล็อคอิน" })
    }
}

// Info team
const getInfoTeam = async (req, res) => {
    try {
        const team = await TeamUse.findOne({ where: { id: req.user.id } })

        if (!team) {
            return res.status(401).json({ message: "ไม่พบข้อมูลผู้ใช้งาน" })
        }

        return res.status(200).json({ team })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลส่วนตัว" })
    }
}

// all team
const getAllTeam = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const team = await TeamUse.findAll()

        if (!team) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลทีม' })
        }

        return res.status(200).json({ team })
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลทั้งหมด" })
    }
}

module.exports = {
    createTeam,
    loginTeam,
    getInfoTeam,
    getAllTeam
}