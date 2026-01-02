const { hashPassword } = require('../helpers/authHelper')
const db = require('../models')
const tb_team = db.tb_team
const tb_memberTeam = db.tb_memberTeam

const createTeam = async (req, res) => {
    try {
        const { teamName, teamType, username, password, memberTeam } = req.body

        const alreadyExistsTeamName = await tb_team.findOne({ where: { teamName: teamName } })
        const alreadyExistsUsername = await tb_team.findOne({ where: { username: username } })

        if (alreadyExistsTeamName) {
            return res.json({ message: 'Team name already exists' });
        }

        if (alreadyExistsUsername) {
            return res.json({ message: 'Username already exists' });
        }

        const hashedPassword = hashPassword(password)

        const newTeam = await tb_team.create({
            teamName,
            teamType,
            username,
            password: hashedPassword,
            role: 'team'
        })

        for (let i = 0; i < memberTeam.length; i++) {
            const { stuID } = memberTeam[i]
            await tb_memberTeam.create({ teamID: newTeam.id, stuID })
        }

        return res.status(201).json({
            status_code: 201,
            msg: 'Team created successfully',
            data: {
                team: newTeam,
                members: memberTeam
            }
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const getTeamInfo = async (req, res) => {
    try {
        const team = await tb_team.findOne({
            where: { id: req.user.id }
        });

        if (!team) {
            return res.status(404).json({
                status_code: 404,
                msg: "Team data not found"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Get Info Success",
            data: team
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

const getTeamAll = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(404).json({
                status_code: 404,
                msg: 'Unauthorized'
            });
        }

        const teams = await tb_team.findAll({})

        if (!teams) {
            return res.status(404).json({
                status_code: 404,
                msg: "Team data not found"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Get All Teams Success",
            data: teams
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const searchTeam = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin' && req.user.role !== 'advisor') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { id, teamName, teamType } = req.query

        const whereClause = {}
        if (id) {
            whereClause.id = id
        }
        if (teamName) {
            whereClause.teamName = teamName
        }
        if (teamType) {
            whereClause.teamType = teamType
        }

        const team = await tb_team.findAll({
            where: whereClause
        })

        if (team.length === 0) {
            return res.status(404).json({
                status_code: 404,
                msg: "Team data not found"
            });
        }

        return res.status(200).json({ status_code: 200, data: team });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const updateTeam = async (req, res) => {
    let team

    const { teamName, teamType, username, password, stuID } = req.body
    try {
        if (
            req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'advisor' &&
            req.user.role !== 'team'
        ) {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        if (!req.params.id) {
            return res.status(404).json({
                status_code: 404,
                msg: 'Team update requires an id'
            });
        }

        team = await tb_team.findOne({
            where: { id: req.params.id }
        })

        if (!team) {
            return res.status(404).json({
                status_code: 404,
                msg: "Team data not found"
            });
        }

        // ตรวจสอบว่าชื่อทีมหรือชื่อผู้ใช้ซ้ำกับที่มีอยู่แล้วหรือไม่
        if (teamName && teamName !== team.teamName) {
            const existingTeamName = await tb_team.findOne({ where: { teamName } })
            if (existingTeamName) {
                return res.status(400).json({
                    status_code: 400,
                    msg: "Team name already exists"
                })
            }
        }

        if (username && username !== team.username) {
            const existingUsername = await tb_team.findOne({ where: { username } });
            if (existingUsername) {
                return res.status(400).json({
                    status_code: 400,
                    message: 'Username already exists'
                });
            }
        }

        team.teamName = teamName || team.teamName
        team.teamType = teamType || team.teamType
        team.username = username || team.username

        if (password) {
            const hashedPassword = await hashPassword(password);
            team.password = hashedPassword;
        }

        if (Array.isArray(stuID) && stuID.length > 0) {
            // ลบข้อมูล memberTeam เก่าของทีม
            await tb_memberTeam.destroy({ where: { teamID: team.id } })

            // สร้างข้อมูล memberTeam ใหม่จาก stuID ที่ส่งมาใน req.body
            for (let i = 0; i < stuID.length; i++) {
                await tb_memberTeam.create({ teamID: team.id, stuID: stuID[i] })
            }
        } else {
            // ถ้าไม่มี stuID ที่ส่งมาหรือ stuID ไม่ใช่อาร์เรย์ ให้ส่งข้อความข้อผิดพลาดกลับไป
            return res.status(400).json({
                status_code: 400,
                msg: 'Invalid stuID data'
            });
        }


        const updateTeam = await team.save()

        if (!updateTeam) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Error updating team data'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'Group updated successfully',
            data: updateTeam
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;

        const team = await tb_team.findOne({ where: { id } });

        if (!team) {
            return res.status(404).json({
                status_code: 404,
                msg: "Team data not found"
            });
        }

        await tb_memberTeam.destroy({ where: { teamID: id } }); // ลบข้อมูลสมาชิกของทีม

        await tb_team.destroy({ where: { id } }); // ลบทีม

        return res.status(200).json({
            status_code: 200,
            msg: 'Team deleted successfully'
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

module.exports = {
    createTeam,
    getTeamInfo,
    getTeamAll,
    searchTeam,
    updateTeam,
    deleteTeam
}