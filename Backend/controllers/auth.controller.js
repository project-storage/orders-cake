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
        const { path: image } = req.file; // แก้ไขตรงนี้
        const { title, name, surname, tel, email, username, password, role } = req.body;

        if (!title || !name || !surname || !tel || !email || !username || !password || !role) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Check if email or username already exists
        const alreadyExistsEmail = await tb_user.findOne({ where: { email } });
        const alreadyExistsUsername = await tb_user.findOne({ where: { username } });
        const alreadyExistsTelephone = await tb_user.findOne({ where: { tel } });

        if (alreadyExistsEmail) {
            return res.status(409).json({
                status_code: 409,
                message: 'Email already exists'
            });
        }
        if (alreadyExistsUsername) {
            return res.status(409).json({
                status_code: 409,
                message: 'Username already exists'
            });
        }
        if (alreadyExistsTelephone) {
            return res.status(409).json({
                status_code: 409,
                message: 'Telephone number already exists'
            });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new tb_user({
            image,
            title,
            name,
            surname,
            tel,
            email,
            username,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        return res.status(201).json({
            status_code: 201,
            msg: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
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
                msg: 'Plese provide both email or username and password'
            })
        }

        let whereClause;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
            whereClause = { email: login };
        } else {
            whereClause = { username: login };
        }

        let userWithIdentifier = await findUser(whereClause)
            || await tb_team.findOne({ where: whereClause })

        if (!userWithIdentifier) {
            return res.status(401).json({
                status_code: 401,
                msg: 'Invalid username/email'
            })
        }

        const passwordMatch = await comparePassword(password, userWithIdentifier.password);

        if (!passwordMatch) {
            return res.status(401).json({
                status_code: 401,
                msg: 'Incorrect password'
            })
        }


        const jwtToken = jwt.sign(
            {
                id: userWithIdentifier.id,
                email: userWithIdentifier.email,
                username: userWithIdentifier.username,
                password: userWithIdentifier.password,
                role: userWithIdentifier.role,
            },
            process.env.JWT_SECRET
        );

        return res.status(200).json({
            status_code: 200,
            msg: 'Welcome back!',
            data: {
                username: userWithIdentifier.username,
                email: userWithIdentifier.email,
                role: userWithIdentifier.role,
                token: jwtToken,
            }
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// create super Admin
const createSuperAdmin = async (req, res) => {
    try {
        // const { path: image } = req.file; // แก้ไขตรงนี้
        const { title, name, surname, email, username, password } = req.body;

        if (!name || !surname || !username || !password) {
            return res.status(400).status({ message: "Please fill in all fields" });
        }

        const superAdmin = await tb_user.findOne({ where: { role: "superAdmin" } })

        if (superAdmin) {
            return res.status(400).json({ status: 400, message: "superAdmin user already exists" })
        }

        // hash the password
        const hashedPassword = await hashPassword(password)

        // create the Admin user
        const newSuperAdminUser = new tb_user({
            // image,
            title,
            name,
            surname,
            email,
            username,
            password: hashedPassword,
            role: 'superAdmin',
        });

        await newSuperAdminUser.save();

        return res.status(201).json({
            status_code: 201,
            msg: 'Super admin created successfully',
            data: newSuperAdminUser
        });
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        })
    }
};

// create Admin
const createAdmin = async (req, res) => {
    try {
        const { path: image } = req.file; // แก้ไขตรงนี้
        const { title, name, surname, email, tel, username, password } = req.body;

        if (!name || !surname || !email || !username || !password) {
            return res.status(400).status({ message: "Please fill in all fields" });
        }

        // hash the password
        const hashedPassword = await hashPassword(password)

        // create the Admin user
        const newAdminUser = new User({
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

        await newAdminUser.save();

        return res.status(201).json({
            status_code: 201,
            msg: 'Admin created successfully',
            data: newAdminUser
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Error creating admin' });
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