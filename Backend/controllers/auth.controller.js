const { comparePassword, hashPassword } = require('../helpers/authHelper');
const db = require('../models')
const tb_user = db.tb_user
const tb_team = db.tb_team
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' });

// image Upload
const multer = require('multer')
const path = require('path')

// register
const register = async (req, res) => {
    try {
        const { title, name, surname, tel, email, username, password, role } = req.body;

        // Input validation
        if (!title || !name || !surname || !tel || !email || !username || !password || !role) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Please fill in all required fields'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Invalid email format'
            });
        }

        // Validate telephone format (10 digits)
        const telRegex = /^\d{10}$/;
        if (!telRegex.test(tel)) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Invalid telephone number format (must be 10 digits)'
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Password must be at least 6 characters long'
            });
        }

        // Check if email or username already exists
        const alreadyExistsEmail = await tb_user.findOne({ where: { email } });
        const alreadyExistsUsername = await tb_user.findOne({ where: { username } });
        const alreadyExistsTelephone = await tb_user.findOne({ where: { tel } });

        if (alreadyExistsEmail) {
            return res.status(409).json({
                status_code: 409,
                msg: 'Email already exists'
            });
        }
        if (alreadyExistsUsername) {
            return res.status(409).json({
                status_code: 409,
                msg: 'Username already exists'
            });
        }
        if (alreadyExistsTelephone) {
            return res.status(409).json({
                status_code: 409,
                msg: 'Telephone number already exists'
            });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await tb_user.create({
            title,
            name,
            surname,
            tel,
            email,
            username,
            password: hashedPassword,
            role,
        });

        // Remove password from response
        const { password: userPassword, ...userWithoutPassword } = newUser.toJSON();

        return res.status(201).json({
            status_code: 201,
            msg: 'User created successfully',
            data: userWithoutPassword
        });
    } catch (error) {
        console.error('Registration Error:', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// login user
const findUser = async (whereClause) => {
    try {
        return await tb_user.findOne({ where: whereClause });
    } catch (error) {
        console.error("Error finding user: ", error);
        return null;
    }
};

const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Please provide both email/username and password'
            });
        }

        // Validate input length
        if (login.length > 100 || password.length > 100) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Invalid input length'
            });
        }

        let whereClause;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(login)) {
            whereClause = { email: login };
        } else {
            whereClause = { username: login };
        }

        let userWithIdentifier = await findUser(whereClause)
            || await tb_team.findOne({ where: whereClause });

        if (!userWithIdentifier) {
            return res.status(401).json({
                status_code: 401,
                msg: 'Invalid username/email or password'
            });
        }

        const passwordMatch = await comparePassword(password, userWithIdentifier.password);

        if (!passwordMatch) {
            return res.status(401).json({
                status_code: 401,
                msg: 'Invalid username/email or password'
            });
        }

        // Create JWT token without password
        const jwtToken = jwt.sign(
            {
                id: userWithIdentifier.id,
                email: userWithIdentifier.email,
                username: userWithIdentifier.username,
                role: userWithIdentifier.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } // Use environment variable for token expiration
        );

        // Remove password from response
        const { password: userPassword, ...userWithoutPassword } = userWithIdentifier.toJSON();

        return res.status(200).json({
            status_code: 200,
            msg: 'Login successful',
            data: {
                user: userWithoutPassword,
                token: jwtToken,
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// create super Admin
const createSuperAdmin = async (req, res) => {
    try {
        const { title, name, surname, email, username, password } = req.body;
        const image = req.file ? req.file.path : null;

        if (!name || !surname || !username || !password) {
            return res.status(400).json({
                status_code: 400,
                msg: "Please fill in all required fields"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Invalid email format'
            });
        }

        // Check if a super admin already exists
        const existingSuperAdmin = await tb_user.findOne({ where: { role: "superAdmin" } });

        if (existingSuperAdmin) {
            return res.status(400).json({
                status_code: 400,
                msg: "Super admin user already exists"
            });
        }

        // Check if username or email already exists
        const existingUser = await tb_user.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                status_code: 409,
                msg: 'Username or email already exists'
            });
        }

        // hash the password
        const hashedPassword = await hashPassword(password);

        // create the Admin user
        const newSuperAdminUser = await tb_user.create({
            image,
            title,
            name,
            surname,
            email,
            username,
            password: hashedPassword,
            role: 'superAdmin',
        });

        // Remove password from response
        const { password: userPassword, ...userWithoutPassword } = newSuperAdminUser.toJSON();

        return res.status(201).json({
            status_code: 201,
            msg: 'Super admin created successfully',
            data: userWithoutPassword
        });
    } catch (error) {
        console.error('Create Super Admin Error:', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// create Admin
const createAdmin = async (req, res) => {
    try {
        const { title, name, surname, email, tel, username, password } = req.body;
        const image = req.file ? req.file.path : null;

        if (!name || !surname || !email || !username || !password) {
            return res.status(400).json({
                status_code: 400,
                msg: "Please fill in all required fields"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Invalid email format'
            });
        }

        // Validate telephone format (10 digits)
        const telRegex = /^\d{10}$/;
        if (tel && !telRegex.test(tel)) {
            return res.status(400).json({
                status_code: 400,
                msg: 'Invalid telephone number format (must be 10 digits)'
            });
        }

        // Check if username or email already exists
        const existingUser = await tb_user.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                status_code: 409,
                msg: 'Username or email already exists'
            });
        }

        // hash the password
        const hashedPassword = await hashPassword(password);

        // create the Admin user
        const newAdminUser = await tb_user.create({
            image,
            title,
            name,
            surname,
            tel,
            email,
            username,
            password: hashedPassword,
            role: 'Admin',
        });

        // Remove password from response
        const { password: userPassword, ...userWithoutPassword } = newAdminUser.toJSON();

        return res.status(201).json({
            status_code: 201,
            msg: 'Admin created successfully',
            data: userWithoutPassword
        });
    } catch (error) {
        console.error('Create Admin Error:', error);
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

// Upload Image Controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/users')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

module.exports = {
    register,
    login,
    createSuperAdmin,
    createAdmin,
    upload
}