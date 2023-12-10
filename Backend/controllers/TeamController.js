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

// search team
const getTeamWithAllParams = async (req, res) => {
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const {
            id,
            team_type,
            team_name,
            member1,
            member2,
            member3,
            member4,
            member5
        } = req.query

        const whereClause = {}
        if (id) {
            whereClause.id = id
        }
        if (team_type) {
            whereClause.team_type = team_type
        }
        if (team_name) {
            whereClause.team_name = team_name
        }
        if (member1) {
            whereClause.member1 = member1
        }
        if (member2) {
            whereClause.member2 = member2
        }
        if (member3) {
            whereClause.member3 = member3
        }
        if (member4) {
            whereClause.member4 = member4
        }
        if (member5) {
            whereClause.member5 = member5
        }

        const team = await TeamUse.findAll({
            where: whereClause
        })

        if (team.length === 0) {
            return res.status(405).json({ message: "ไม่พบข้อมูลทีม" })
        }

        return res.status(200).json({ team })

    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในการค้นหาข้อมูล" })
    }
}

// update team
const updateTeam = async (req, res) => {
    const {
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

    let team
    try {
        // ตรวจสอบบทบาทของผู้ใช้
        if (req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'team') {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (!req.params.id) {
            return res.status(404).json({ message: 'อัปเดตครูที่ปรึกษาต้องระบบ id' })
        }

        team = await TeamUse.findOne({ where: { id: req.params.id } })

        if (!team) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้งานทีม' })
        }

        if (team_name !== team.team_name) {
            const alreadyExistsTemaName = await TeamUse.findOne({ where: { team_name: team_name } })

            if (alreadyExistsTemaName) {
                return res.status(400).json({ message: "ชื่อผู้ใช้มีอยู่แล้ว" })
            }
        }

        if (team_username !== team.team_username) {
            const alreadyExistsTemaUsername = await TeamUse.findOne({ where: { team_username: team_username } })

            if (alreadyExistsTemaUsername) {
                return res.status(400).json({ message: "ชื่อผู้ใช้มีอยู่แล้ว" })
            }
        }

        if (team_telephone !== team.team_telephone) {
            const alreadyExistsTemaTelephone = await TeamUse.findOne({ where: { team_telephone: team_telephone } })

            if (alreadyExistsTemaTelephone) {
                return res.status(400).json({ message: "มีเบอร์โทรศัพท์นี้อยู่แล้ว" })
            }
        }

        if (member1 !== team.member1) {
            const alreadyExistsMember1 = await TeamUse.findOne({ where: { member1: member1 } })

            if (alreadyExistsMember1) {
                return res.status(400).json({ message: "มีชื่อสมาชิกนี้แล้ว" })
            }
        }

        if (member2 !== team.member2) {
            const alreadyExistsMember2 = await TeamUse.findOne({ where: { member2: member2 } })

            if (alreadyExistsMember2) {
                return res.status(400).json({ message: "มีชื่อสมาชิกนี้แล้ว" })
            }
        }

        if (member3 !== team.member3) {
            const alreadyExistsMember3 = await TeamUse.findOne({ where: { member3: member3 } })

            if (alreadyExistsMember3) {
                return res.status(400).json({ message: "มีชื่อสมาชิกนี้แล้ว" })
            }
        }


        if (member4 !== team.member4) {
            const alreadyExistsMember4 = await TeamUse.findOne({ where: { member4: member4 } })

            if (alreadyExistsMember4) {
                return res.status(400).json({ message: "มีชื่อสมาชิกนี้แล้ว" })
            }
        }


        if (member5 !== team.member5) {
            const alreadyExistsMember5 = await TeamUse.findOne({ where: { member5: member5 } })

            if (alreadyExistsMember5) {
                return res.status(400).json({ message: "มีชื่อสมาชิกนี้แล้ว" })
            }
        }

        team.team_name = team_name || team.team_name
        team.team_username = team_username || team.team_username
        team.team_telephone = team_telephone || team.team_telephone
        team.member1 = member1 || team.member1
        team.member2 = member2 || team.member2
        team.member3 = member3 || team.member3
        team.member4 = member4 || team.member4
        team.member5 = member5 || team.member5

        if (team_password) {
            const hashedPassword = await bcrypt.hash(team_password, saltRounds)
            team.team_password = hashedPassword
        }

        const updateTeam = await team.save()

        if (!updateTeam) {
            return res.status(400).json({ message: 'ข้อผิดพลาดในการอัปเดตข้อมูลทีม' })
        }

        return res.status(200).json({ message: "ทีมอัปเดตเรียบร้อยแล้ว" })
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลทีม' })
    }
}

module.exports = {
    createTeam,
    loginTeam,
    getInfoTeam,
    getAllTeam,
    getTeamWithAllParams,
    updateTeam
}