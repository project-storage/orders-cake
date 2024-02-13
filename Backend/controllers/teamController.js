const db = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10

const Student = db.student
const Team = db.team
const MemberTeam = db.memberTeam

const createTeam = async (req, res) => {
    try {
        const { teamName, teamType, username, password, memberTeam } = req.body

        const alreadyExistsTeamName = await Team.findOne({ where: { teamName: teamName } })
        const alreadyExistsUsername = await Team.findOne({ where: { username: username } })

        if (alreadyExistsTeamName) {
            return res.json({ message: 'Team name already exists' });
        }

        if (alreadyExistsUsername) {
            return res.json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newTeam = await Team.create({
            teamName,
            teamType,
            username,
            password: hashedPassword,
            role: 'team'
        })

        for (let i = 0; i < memberTeam.length; i++) {
            const { stuID } = memberTeam[i]
            await MemberTeam.create({ teamID: newTeam.id, stuID })
        }

        return res.status(200).json({
            status_code: 200,
            message: 'Team created successfully',
            data: {
                team: newTeam,
                members: memberTeam
            }
        });
    } catch (error) {
        console.error("Error creating team: ", error);
        return res.status(500).json({ message: 'An error occurred while creating a team' });
    }
}

const getInfoTeam = async (req, res) => {
    try {
        const team = await Team.findOne({
            where: { id: req.user.id }
        });

        if (!team) {
            return res.status(401).json({ message: "User data not found" });
        }

        return res.status(200).json({ status_code: 200, message: "Get Info Success", data: team });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching user data' });
    }
};

const getAllTeam = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const teams = await Team.findAll({})

        if (!teams) {
            return res.status(404).json({ message: 'Team data not found' });
        }

        return res.status(200).json({ status_code: 200, message: "Get All Teams Success", data: teams });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching all teams' });
    }
}

const getTeamWithAllParams = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin' && req.user.role !== 'teacher') {
            return res.status(401).json({ message: 'Unauthorized' });
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

        const team = await Team.findAll({
            where: whereClause
        })

        if (team.length === 0) {
            return res.status(405).json({ message: "Team data not found" })
        }

        return res.status(200).json({ status_code: 200, data: team });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching team data' });
    }
}

const updateTeam = async (req, res) => {
    let team

    const { teamName, teamType, username, password, stuID } = req.body
    try {
        if (
            req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'team'
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!req.params.id) {
            return res.status(404).json({ message: 'Team update requires an id' });
        }

        team = await Team.findOne({
            where: { id: req.params.id }
        })

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // ตรวจสอบว่าชื่อทีมหรือชื่อผู้ใช้ซ้ำกับที่มีอยู่แล้วหรือไม่
        if (teamName && teamName !== team.teamName) {
            const existingTeamName = await Team.findOne({ where: { teamName } })
            if (existingTeamName) {
                return res.status(400).json({ message: "Username already exists" })
            }
        }

        if (username && username !== team.username) {
            const existingUsername = await Team.findOne({ where: { username } });
            if (existingUsername) {
                return res.status(400).json({ message: 'Username already exists' });
            }
        }

        team.teamName = teamName || team.teamName
        team.teamType = teamType || team.teamType
        team.username = username || team.username

        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            team.password = hashedPassword;
        }

        if (Array.isArray(stuID) && stuID.length > 0) {
            // ลบข้อมูล memberTeam เก่าของทีม
            await MemberTeam.destroy({ where: { teamID: team.id } })

            // สร้างข้อมูล memberTeam ใหม่จาก stuID ที่ส่งมาใน req.body
            for (let i = 0; i < stuID.length; i++) {
                await MemberTeam.create({ teamID: team.id, stuID: stuID[i] })
            }
        } else {
            // ถ้าไม่มี stuID ที่ส่งมาหรือ stuID ไม่ใช่อาร์เรย์ ให้ส่งข้อความข้อผิดพลาดกลับไป
            return res.status(400).json({ message: 'Invalid stuID data' });
        }


        const updateTeam = await team.save()

        if (!updateTeam) {
            return res.status(400).json({ message: 'Error updating team data' });
        }

        return res.status(200).json({
            status_code: 200,
            message: 'Group updated successfully',
            data: updateTeam
        });
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'An error occurred while updating team data' });
    }
}

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;

        const team = await Team.findOne({ where: { id } });

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        await MemberTeam.destroy({ where: { teamID: id } }); // ลบข้อมูลสมาชิกของทีม

        await Team.destroy({ where: { id } }); // ลบทีม

        return res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while deleting the team' });
    }
}



module.exports = {
    createTeam,
    getInfoTeam,
    getAllTeam,
    getTeamWithAllParams,
    updateTeam,
    deleteTeam
}
