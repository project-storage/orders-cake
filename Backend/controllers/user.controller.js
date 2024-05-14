const { hashPassword } = require('../helpers/authHelper');
const db = require('../models')
const tb_user = db.tb_user
const fs = require('fs');

const getUserInfo = async (req, res) => {
    try {
        const user = await tb_user.findOne({ where: { id: req.user.id } });

        if (!user) {
            return res.status(404).json({
                status_code: 404,
                msg: 'User not found'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: "Get user info success",
            data: user
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const getUserAll = async (req, res) => {
    try {
        // Check user role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'Admin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        // Find all users from the database
        const users = await tb_user.findAll();

        if (!users) {
            return res.status(404).json({
                status_code: 404,
                msg: 'User not found'
            });
        }
        
        return res.status(200).json({
            status_code: 200,
            msg: "Get user all success",
            data: users
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const searchUser = async (req, res) => {
    try {
        // Check user role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'Admin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        // Check userId value from URL parameters
        const { id, name, surname, tel, email, username, role } = req.query;

        // Create an object to store search conditions
        const whereClause = {};
        if (id) {
            whereClause.id = id;
        }
        if (name) {
            whereClause.name = name;
        }
        if (surname) {
            whereClause.surname = surname;
        }
        if (email) {
            whereClause.email = email;
        }
        if (username) {
            whereClause.username = username;
        }
        if (tel) {
            whereClause.tel = tel;
        }
        if (role) {
            whereClause.role = role;
        }

        // Execute the database search command
        const queryUser = await tb_user.findAll({ where: whereClause });

        if (queryUser.length === 0) {
            return res.status(404).json({
                status_code: 404,
                msg: 'User not found'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'Search data user successfully',
            data: queryUser
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { title, name, surname, username, email, password, tel } = req.body;
        let { image } = req.body;

        let user;

        // Check user role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'ครูที่ปรึกษา') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        if (req.user.role === 'superAdmin' || req.user.role === 'ครูที่ปรึกษา') {
            // Check if ID is provided
            if (!req.params.id) {
                return res.status(400).json({
                    status_code: 400,
                    msg: 'Updating user requires specifying id'
                });
            }
            // Find user by ID
            user = await tb_user.findOne({ where: { id: req.params.id } });
            if (!user) {
                return res.status(404).json({
                    status_code: 404,
                    msg: 'User not found'
                });
            }
        }

        if (name !== user.name) {
            const alreadyExistsName = await tb_user.findOne({ where: { name } });

            if (alreadyExistsName) {
                return res.status(400).json({
                    status_code: 400,
                    msg: 'Name already exists'
                });
            }
        }

        if (surname !== user.surname) {
            const alreadyExistsSurname = await tb_user.findOne({ where: { surname } });

            if (alreadyExistsSurname) {
                return res.status(400).json({
                    status_code: 400,
                    msg: 'Surname already exists'
                });
            }
        }

        if (username !== user.username) {
            const alreadyExistsUsername = await tb_user.findOne({ where: { username } });

            if (alreadyExistsUsername) {
                return res.status(400).json({
                    status_code: 400,
                    msg: 'Username already exists'
                });
            }
        }

        if (email !== user.email) {
            const alreadyExistsEmail = await tb_user.findOne({ where: { email } });

            if (alreadyExistsEmail) {
                return res.status(400).json({
                    status_code: 400,
                    msg: 'Email already exists'
                });
            }
        }

        if (tel !== user.tel) {
            const alreadyExistsTelephone = await tb_user.findOne({ where: { tel } });

            if (alreadyExistsTelephone) {
                return res.status(400).json({
                    status_code: 400,
                    msg: 'Telephone already exists'
                });
            }
        }

        // Check if image is provided and update image path
        if (req.file) {
            image = req.file.path;
            // Delete old image
            if (user.image) {
                fs.unlinkSync(user.image); // ลบรูปภาพเดิมออกจากโฟลเดอร์
            }
        }

        user.title = title || user.title;
        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.email = email || user.email;
        user.tel = tel || user.tel;
        user.username = username || user.username;
        user.image = image || user.image; // Update image path

        if (password) {
            const hashedPassword = await hashPassword(password);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        if (!updatedUser) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Error updating user'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: `User updated successfully ID: ${req.user.id}`,
            data: updatedUser
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        // Check user role
        if (req.user.role !== 'superAdmin' && req.user.role !== 'Admin') {
            return res.status(401).json({
                status_code: 401,
                msg: 'Unauthorized'
            });
        }

        const user = await tb_user.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({
                status_code: 404,
                msg: 'User not found'
            });
        }

        // Check if the user has an image
        if (user.image) {
            // Delete user's image
            fs.unlinkSync(user.image);
        }

        const deletedUser = await user.destroy();

        if (!deletedUser) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Error deleting user'
            });
        }

        return res.status(200).json({
            status_code: 200,
            msg: 'User deleted successfully'
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
    getUserInfo,
    getUserAll,
    searchUser,
    updateUser,
    deleteUser
}