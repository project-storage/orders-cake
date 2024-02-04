const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const Team = db.team;

// Register team
const createTeam = async (req, res) => {
    try {
        const {
            teamType,
            teamName,
            username,
            password,
            telephone,
            member1,
            member2,
            member3,
            member4,
            member5,
            remake
        } = req.body;

        const alreadyExistsTeamName = await Team.findOne({ where: { teamName } });
        const alreadyExistsUsername = await Team.findOne({ where: { username } });
        const alreadyExistsTelephone = await Team.findOne({ where: { telephone } });

        if (alreadyExistsTeamName) {
            return res.json({ message: 'Team name already exists' });
        }
        if (alreadyExistsTelephone) {
            return res.json({ message: 'Telephone number already exists' });
        }
        if (alreadyExistsUsername) {
            return res.json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newTeam = new Team({
            teamType,
            teamName,
            username,
            password: hashedPassword,
            telephone,
            member1,
            member2,
            member3,
            member4,
            member5,
            remake,
            role: "team"
        });

        await newTeam.save();
        return res.status(200).json({ message: 'Team user created successfully', create: newTeam });
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ message: "An error occurred while creating team user" });
    }
};

// Info team
const getInfoTeam = async (req, res) => {
    try {
        const team = await Team.findOne({ where: { id: req.user.id } });

        if (!team) {
            return res.status(401).json({ message: "Team user data not found" });
        }

        return res.status(200).json({ team: team });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "An error occurred while fetching team user data" });
    }
};

// All teams
const getAllTeam = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const team = await Team.findAll();

        if (!team) {
            return res.status(404).json({ message: 'Team user data not found' });
        }

        return res.status(200).json({ team: team });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "An error occurred while fetching all team user data" });
    }
};

// Search team
const getTeamWithAllParams = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const {
            id,
            teamType,
            teamName,
            member1,
            member2,
            member3,
            member4,
            member5,
            remake
        } = req.query;

        const whereClause = {};
        if (id) {
            whereClause.id = id;
        }
        if (teamType) {
            whereClause.teamType = teamType;
        }
        if (teamName) {
            whereClause.teamName = teamName;
        }
        if (member1) {
            whereClause.member1 = member1;
        }
        if (member2) {
            whereClause.member2 = member2;
        }
        if (member3) {
            whereClause.member3 = member3;
        }
        if (member4) {
            whereClause.member4 = member4;
        }
        if (member5) {
            whereClause.member5 = member5;
        }
        if (remake) {
            whereClause.remake = remake;
        }

        const team = await Team.findAll({
            where: whereClause
        });

        if (team.length === 0) {
            return res.status(405).json({ message: "Team user data not found" });
        }

        return res.status(200).json({ team: team });

    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: "An error occurred while searching for team user data" });
    }
};

// Update team
const updateTeam = async (req, res) => {
    const {
        teamName,
        username,
        password,
        telephone,
        member1,
        member2,
        member3,
        member4,
        member5,
        remake
    } = req.body;

    let team;
    try {
        // Check user roles
        if (req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'team') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!req.params.id) {
            return res.status(404).json({ message: 'Team user update requires an id' });
        }

        team = await Team.findOne({ where: { id: req.params.id } });

        if (!team) {
            return res.status(404).json({ message: 'Team user not found' });
        }

        if (teamName !== team.teamName) {
            const alreadyExistsTeamName = await Team.findOne({ where: { teamName: teamName } });

            if (alreadyExistsTeamName) {
                return res.status(400).json({ message: "Team name already exists" });
            }
        }

        if (username !== team.username) {
            const alreadyExistsUsername = await Team.findOne({ where: { username: username } });

            if (alreadyExistsUsername) {
                return res.status(400).json({ message: "Username already exists" });
            }
        }

        if (telephone !== team.telephone) {
            const alreadyExistsTelephone = await Team.findOne({ where: { telephone: telephone } });

            if (alreadyExistsTelephone) {
                return res.status(400).json({ message: "Telephone number already exists" });
            }
        }

        if (member1 !== team.member1) {
            const alreadyExistsMember1 = await Team.findOne({ where: { member1: member1 } });

            if (alreadyExistsMember1) {
                return res.status(400).json({ message: "Member already exists" });
            }
        }

        if (member2 !== team.member2) {
            const alreadyExistsMember2 = await Team.findOne({ where: { member2: member2 } });

            if (alreadyExistsMember2) {
                return res.status(400).json({ message: "Member already exists" });
            }
        }

        if (member3 !== team.member3) {
            const alreadyExistsMember3 = await Team.findOne({ where: { member3: member3 } });

            if (alreadyExistsMember3) {
                return res.status(400).json({ message: "Member already exists" });
            }
        }

        if (member4 !== team.member4) {
            const alreadyExistsMember4 = await Team.findOne({ where: { member4: member4 } });

            if (alreadyExistsMember4) {
                return res.status(400).json({ message: "Member already exists" });
            }
        }

        if (member5 !== team.member5) {
            const alreadyExistsMember5 = await Team.findOne({ where: { member5: member5 } });

            if (alreadyExistsMember5) {
                return res.status(400).json({ message: "Member already exists" });
            }
        }

        team.teamName = teamName || team.teamName;
        team.username = username || team.username;
        team.telephone = telephone || team.telephone;
        team.member1 = member1 || team.member1;
        team.member2 = member2 || team.member2;
        team.member3 = member3 || team.member3;
        team.member4 = member4 || team.member4;
        team.member5 = member5 || team.member5;
        team.remake = remake || team.remake;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            team.password = hashedPassword;
        }

        const updatedTeam = await team.save();

        if (!updatedTeam) {
            return res.status(400).json({ message: 'An error occurred while updating team user data' });
        }

        return res.status(200).json({ message: "Team user updated successfully", update: team });
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'An error occurred while updating team user data' });
    }
};

// Delete team
const deleteTeam = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const team = await Team.findOne({ where: { id: req.params.id } });
        if (!team) {
            return res.status(404).json({ message: 'Team user not found' });
        }

        const deletedTeam = await team.destroy();
        if (!deletedTeam) {
            return res.status(400).json({ message: 'An error occurred while deleting team user data' });
        }

        return res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while deleting team user data' });
    }
};

module.exports = {
    createTeam,
    getInfoTeam,
    getAllTeam,
    getTeamWithAllParams,
    updateTeam,
    deleteTeam
};
