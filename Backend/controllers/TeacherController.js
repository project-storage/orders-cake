const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const Teacher = db.teacher;
const YearLevel = db.yearlevel;
const Department = db.department;

require('dotenv').config({ path: './config.env' });

// Register teacher
const createTeacher = async (req, res) => {
    const {
        title,
        name,
        surname,
        telephone,
        email,
        username,
        password,
    } = req.body;

    try {
        const alreadyExistsEmail = await Teacher.findOne({ where: { email } });
        const alreadyExistsUsername = await Teacher.findOne({ where: { username } });

        if (alreadyExistsEmail) {
            return res.json({ message: 'Email already exists' });
        }
        if (alreadyExistsUsername) {
            return res.json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newTeacher = new Teacher({
            title,
            name,
            surname,
            telephone,
            email,
            username,
            password: hashedPassword,
            role: 'teacher',
        });

        await newTeacher.save();
        console.log(newTeacher);
        return res.status(200).json({ status_code: 200, message: 'Teacher created successfully', data: newTeacher });
    } catch (error) {
        console.error("Error creating teacher: ", error);
        return res
            .status(500)
            .json({ message: 'An error occurred while creating a teacher' });
    }
};

// Info teacher
const getInfoTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({
            where: { id: req.user.id }
        });

        if (!teacher) {
            return res.status(401).json({ message: "User data not found" });
        }

        return res.status(200).json({ status_code: 200, message: "Get Info Success", data: teacher });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching user data' });
    }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const teachers = await Teacher.findAll({});
        if (!teachers) {
            return res.status(404).json({ message: 'Teacher data not found' });
        }

        return res.status(200).json({ status_code: 200, message: "Get All Teachers Success", data: teachers });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching all teachers' });
    }
};

// Search teacher
const getTeacherWithAllParams = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id, teachname, teachsurname, email, username, role } = req.query;

        const whereClause = {};
        if (id) {
            whereClause.id = id;
        }
        if (teachname) {
            whereClause.teachname = teachname;
        }
        if (teachsurname) {
            whereClause.teachsurname = teachsurname;
        }
        if (email) {
            whereClause.email = email;
        }
        if (username) {
            whereClause.username = username;
        }
        if (role) {
            whereClause.role = role;
        }

        const teachers = await Teacher.findAll({});
        if (teachers.length === 0) {
            return res.status(405).json({ message: "Teacher data not found" });
        }

        return res.status(200).json({ status_code: 200, message: "Search Success", data: teachers });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching teachers' });
    }
};

// Update teacher 
const updateTeacher = async (req, res) => {
    const {
        teachname,
        teachsurname,
        teachtelephone,
        email,
        username,
        password,
    } = req.body;

    let teacher;

    try {
        // Check user roles
        if (req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'teacher') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!req.params.id) {
            return res.status(404).json({ message: 'Teacher update requires an id' });
        }
        teacher = await Teacher.findOne({
            where: { id: req.params.id }
        });

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        if (username !== teacher.username) {
            const alreadyExistsUsername = await Teacher.findOne({ where: { username } });

            if (alreadyExistsUsername) {
                return res.status(400).json({ message: 'Username already exists' });
            }
        }

        if (email !== teacher.email) {
            const alreadyExistsEmail = await Teacher.findOne({ where: { email } });

            if (alreadyExistsEmail) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        teacher.teachname = teachname || teacher.teachname;
        teacher.teachsurname = teachsurname || teacher.teachsurname;
        teacher.teachtelephone = teachtelephone || teacher.teachtelephone;
        teacher.email = email || teacher.email;
        teacher.username = username || teacher.username;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            teacher.password = hashedPassword;
        }

        const updatedTeacher = await teacher.save();

        if (!updatedTeacher) {
            return res.status(400).json({ message: 'Error updating teacher data' });
        }

        return res.status(200).json({ status_code: 200, message: 'Teacher updated successfully', data: updateTeacher });
    } catch (error) {
        console.error("Error", error);
        return res
            .status(500)
            .json({ message: 'An error occurred while updating teacher data' });
    }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const teacher = await Teacher.findOne({ where: { id: req.params.id } });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const deletedTeacher = await teacher.destroy();
        if (!deletedTeacher) {
            return res.status(400).json({ message: 'Error deleting teacher data' });
        }

        return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while deleting teacher data' });
    }
};

module.exports = {
    createTeacher,
    getInfoTeacher,
    getAllTeachers,
    getTeacherWithAllParams,
    updateTeacher,
    deleteTeacher
};
