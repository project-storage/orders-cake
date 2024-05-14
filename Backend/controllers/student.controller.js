const db = require('../models')
const tb_student = db.tb_student

// create student
const createStudent = async (req, res) => {
    try {
        // Check if req.user exists and has the correct role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const {
            stuNumber,
            stuIdCard,
            title,
            name,
            surname,
            telephone,
            groupID
        } = req.body;

        const alreadyExistsNumber = await tb_student.findOne({ where: { stuNumber } });
        const alreadyExistsIdCard = await tb_student.findOne({ where: { stuIdCard } });
        const alreadyExistsTelephone = await tb_student.findOne({ where: { telephone } });

        if (alreadyExistsNumber) {
            return res.json({ message: 'Student number already exists' });
        }
        if (alreadyExistsIdCard) {
            return res.json({ message: 'ID card number already exists' });
        }
        if (alreadyExistsTelephone) {
            return res.json({ message: "Telephone number already exists" });
        }

        const newStudents = new Student({
            stuNumber,
            stuIdCard,
            title,
            name,
            surname,
            telephone,
            groupID
        });

        await newStudents.save();
        return res.status(201).json({
            status_code: 201,
            msg: 'Student created successfully',
            data: newStudents
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Info student
const getStudentInfo = async (req, res) => {
    try {
        // Check if req.user exists and has the correct role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const student = await tb_student.findOne({
            where: { id: req.user.id }
        });

        if (!student) {
            return res.status(404).json({
                status_code: 404,
                msg: "Student data not found"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Get info student success",
            data: student
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// All students
const getStudentAll = async (req, res) => {
    try {
        // Check if req.user exists and has the correct role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const students = await tb_student.findAll({});

        if (!students) {
            return res.status(404).json({
                status_code: 404,
                msg: "Student data not found"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Get all data student success",
            data: students
        });

    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Search student
const searchStudent = async (req, res) => {
    try {
        // Check if req.user exists and has the correct role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const { id, stuNumber, name } = req.query;

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

        const students = await tb_student.findAll({
            where: whereClause
        });

        if (students.length === 0) {
            return res.status(404).json({
                status_code: 404,
                msg: "Student data not found"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "search student success",
            data: students
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
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
            groupID
        } = req.body;

        let student;

        // Check if req.user exists and has the correct role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        student = await tb_student.findOne({
            where: { id: req.params.id }
        });

        if (!student) {
            return res.status(404).json({
                status_code: 404,
                msg: "Student data not found"
            });
        }

        if (telephone !== student.telephone) {
            const alreadyExistsTelephone = await tb_student.findOne({ where: { telephone } })

            if (alreadyExistsTelephone) {
                return res.status(400).json({
                    status_code: 400,
                    msg: "Telephone already exists"
                })
            }
        }

        student.stuNumber = stuNumber || student.stuNumber;
        student.stuIdCard = stuIdCard || student.stuIdCard;
        student.title = title || student.title;
        student.name = name || student.name;
        student.surname = surname || student.surname;
        student.telephone = telephone || student.telephone;
        student.groupID = groupID || student.groupID;

        const updatedStudent = await student.save();

        if (!updatedStudent) {
            return res.status(400).json({
                status_code: 400,
                msg: "Error updating student data"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Student updated successfully",
            data: updatedStudent
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    try {
        // Check if req.user exists and has the correct role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const student = await tb_student.findOne({ where: { id: req.params.id } });

        if (!student) {
            return res.status(404).json({
                status_code: 404,
                msg: "Student data not found"
            });
        }

        const deleteStudent = await student.destroy();

        if (!deleteStudent) {
            return res.status(400).json({
                status_code: 400,
                msg: "Error deleting student data"
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Student deleted successfully"
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

module.exports = {
    createStudent,
    getStudentInfo,
    getStudentAll,
    searchStudent,
    updateStudent,
    deleteStudent
};
