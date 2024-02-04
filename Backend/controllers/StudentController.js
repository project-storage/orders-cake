const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const Student = db.student;
const Teacher = db.teacher;
const YearLevel = db.yearlevel;
const Department = db.department;

require('dotenv').config({ path: './config.env' });

// Register student
const createStudent = async (req, res) => {
    const {
        stuNumber,
        stuIdCard,
        title,
        name,
        surname,
        telephone,
        email,
        username,
        password,
        groupID
    } = req.body;

    try {
        const alreadyExistsNumber = await Student.findOne({ where: { stuNumber } });
        const alreadyExistsIdCard = await Student.findOne({ where: { stuIdCard } });
        const alreadyExistsEmail = await Student.findOne({ where: { email } });
        const alreadyExistsUsername = await Student.findOne({ where: { username } });
        const alreadyExistsTelephone = await Student.findOne({ where: { telephone } });

        if (alreadyExistsNumber) {
            return res.json({ message: 'Student number already exists' });
        }
        if (alreadyExistsIdCard) {
            return res.json({ message: 'ID card number already exists' });
        }
        if (alreadyExistsEmail) {
            return res.json({ message: 'Email already exists' });
        }
        if (alreadyExistsUsername) {
            return res.json({ message: 'Username already exists' });
        }
        if (alreadyExistsTelephone) {
            return res.json({ message: 'Telephone number already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newStudents = new Student({
            title,
            stuNumber,
            stuIdCard,
            name,
            surname,
            telephone,
            email,
            username,
            password: hashedPassword,
            role: 'Student',
            groupID
        });

        await newStudents.save();
        return res.status(200).json({ message: 'Student created successfully' });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while creating a student' });
    }
};

// Info student
const getInfoStudent = async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { id: req.user.id }
        });

        if (!student) {
            return res.status(401).json({ message: "User data not found" });
        }

        return res.status(200).json({ student });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching student data' });
    }
};

// All students
const getAllStudent = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin' && req.user.role !== 'teacher') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const students = await Student.findAll({});

        if (!students) {
            return res.status(404).json({ message: "Student data not found" });
        }

        return res.status(200).json(students);

    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching student data' });
    }
};

// Search student
const getStudentWithAllParams = async (req, res) => {
    try {
        // Check user roles
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin' && req.user.role !== 'teacher') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { id, stuNumber, name, email, username } = req.query;

        const whereClause = {};
        if (id) {
            whereClause.id = id;
        }
        if (stuNumber) {
            whereClause.stuNumber = stuNumber;
        }
        if (name) {
            whereClause.name = name;
        }
        if (email) {
            whereClause.email = email;
        }
        if (username) {
            whereClause.username = username;
        }

        const students = await Student.findAll({
            where: whereClause
        });

        if (students.length === 0) {
            return res.status(405).json({ message: "Student data not found" });
        }

        return res.status(200).json(students);
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while fetching student data' });
    }
};

// Update student 
const updateStudent = async (req, res) => {
    try {
        const {
            stuNumber,
            stuIdCard,
            title,
            name,
            surname,
            telephone,
            email,
            username,
            password,
            groupID
        } = req.body;

        let student;

        // Check user roles
        if (req.user.role !== 'Admin' &&
            req.user.role !== 'superAdmin' &&
            req.user.role !== 'teacher' &&
            req.user.role !== 'student'
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        student = await Student.findOne({
            where: { id: req.params.id }
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (username !== student.username) {
            const alreadyExistsUsername = await Student.findOne({ where: { username } });

            if (alreadyExistsUsername) {
                return res.status(400).json({ message: "Username already exists" });
            }
        }

        if (email !== student.email) {
            const alreadyExistsEmail = await Student.findOne({ where: { email } });

            if (alreadyExistsEmail) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        student.stuNumber = stuNumber || student.stuNumber;
        student.stuIdCard = stuIdCard || student.stuIdCard;
        student.title = title || student.title;
        student.name = name || student.name;
        student.surname = surname || student.surname;
        student.telephone = telephone || student.telephone;
        student.email = email || student.email;
        student.username = username || student.username;
        student.groupID = groupID || student.groupID;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            student.password = hashedPassword;
        }

        const updatedStudent = await student.save();

        if (!updatedStudent) {
            return res.status(400).json({ message: "Error updating student data" });
        }

        return res.status(200).json({ message: "Student updated successfully", updatedStudent });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while updating student data' });
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    try {
        if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const student = await Student.findOne({ where: { id: req.params.id } });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const deleteStudent = await student.destroy();
        if (!deleteStudent) {
            return res.status(400).json({ message: "Error deleting student data" });
        }

        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ message: 'An error occurred while deleting student data' });
    }
};

module.exports = {
    createStudent,
    getInfoStudent,
    getAllStudent,
    getStudentWithAllParams,
    updateStudent,
    deleteStudent
};
