const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const User = db.user;
const Team = db.team;
const Teacher = db.teacher;
const Student = db.student;

require('dotenv').config({ path: './config.env' });

// create super Admin
const createSuperAdminUser = async (req, res) => {
  try {
    const { title, name, surname, email, username, password } = req.body;

    if (!name || !surname || !username || !password) {
      return res.status(400).status({ message: "Please fill in all fields" });
    }

    const superAdmin = await User.findOne({ where: { role: "superAdmin" } })

    if (superAdmin) {
      return res.status(400).json({ status: 400, message: "superAdmin user already exists" })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create the Admin user
    const newSuperAdminUser = new User({
      title,
      name,
      surname,
      email,
      username,
      password: hashedPassword,
      role: 'superAdmin',
    });

    await newSuperAdminUser.save();
    return res.status(200).json({ status_code: 200, message: 'Super admin created successfully', data: newSuperAdminUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error creating super admin' });
  }
};

// create Admin
const createAdminUser = async (req, res) => {
  try {
    const { title, name, surname, username, password } = req.body;

    if (!name || !surname || !username || !password) {
      return res.status(400).status({ message: "Please fill in all fields" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create the Admin user
    const newAdminUser = new User({
      title,
      name,
      surname,
      username,
      password: hashedPassword,
      role: 'Admin',
    });

    await newAdminUser.save();
    return res.status(200).json({ status_code: 200, message: 'Admin created successfully', data: newAdminUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error creating admin' });
  }
};

// register
const registerUser = async (req, res) => {
  try {
    const { title, name, surname, telephone, email, username, password, role } = req.body;

    if (!title || !name || !surname || !telephone || !email || !username || !password || !role) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if email or username already exists
    const alreadyExistsEmail = await User.findOne({ where: { email } });
    const alreadyExistsUsername = await User.findOne({ where: { username } });
    const alreadyExistsTelephone = await User.findOne({ where: { telephone } });

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

    const newUser = new User({
      title,
      name,
      surname,
      telephone,
      email,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(200).json({ status_code: 200, message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error creating user' });
  }
};

// login user
const findUser = async (whereClause) => {
  try {
    return await User.findOne({ where: whereClause });
  } catch (error) {
    console.error("Error finding user: ", error);
    return null;
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }

    let whereClause;

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
      whereClause = { email: username };
    } else {
      whereClause = { username: username };
    }

    let userWithIdentifier = await findUser(whereClause)
      || await Teacher.findOne({ where: whereClause })
      || await Team.findOne({ where: whereClause })
      || await Student.findOne({ where: whereClause });

    if (!userWithIdentifier) {
      return res.status(401).json({ message: 'Invalid username or email' });
    }

    const passwordMatch = await bcrypt.compare(password, userWithIdentifier.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const jwtToken = jwt.sign(
      {
        id: userWithIdentifier.id,
        email: userWithIdentifier.email,
        username: userWithIdentifier.username,
        role: userWithIdentifier.role,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      status_code: 200,
      message: 'Welcome',
      data: {
        username: username,
        email: userWithIdentifier.email,
        role: userWithIdentifier.role,
        token: jwtToken,
      }
    });
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
};

// get user info
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ status_code: 200, message: "Get info user success", data: user });
  } catch (error) {
    console.error('Error retrieving user info:', error);
    return res.status(500).json({ message: 'Error fetching user data' });
  }
};

// get all user
const getAllUser = async (req, res) => {
  try {
    // Check user role
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find all users from the database
    const users = await User.findAll();

    return res.status(200).json({ status_code: 200, message: "Get all user success", data: users });
  } catch (error) {
    console.error('Error', error);
    return res
      .status(500)
      .json({ message: 'Error fetching all user data' });
  }
};

// search users
const getUserWithAllParams = async (req, res) => {
  try {
    // Check user role
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check userId value from URL parameters
    const { id, name, surname, telephone, email, username, role } = req.query;

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
    if (telephone) {
      whereClause.telephone = telephone;
    }
    if (role) {
      whereClause.role = role;
    }

    // Execute the database search command
    const users = await User.findAll({ where: whereClause });
    if (users.length === 0) {
      return res.status(405).json({ message: 'User not found' });
    }
    return res.status(200).json({ status_code: 200, data: users });
  } catch (error) {
    console.error('Error', error);
    return res
      .status(500)
      .json({ message: 'Error fetching user data' });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { title, name, surname, username, email, password, telephone } = req.body;
    let user;

    // Check user role
    if (
      req.user.role !== 'Admin' &&
      req.user.role !== 'superAdmin' &&
      req.user.role !== 'DepatMoney' &&
      req.user.role !== 'DepatCake'
    ) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (
      req.user.role === 'superAdmin' ||
      req.user.role === 'Admin' ||
      req.user.role === 'DepatMoney' ||
      req.user.role === 'DepatCake'
    ) {
      if (!req.params.id) {
        return res.status(405).json({ message: 'Updating user requires specifying id' });
      }
      user = await User.findOne({ where: { id: req.params.id } });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username !== user.username) {
      const alreadyExistsUser = await User.findOne({ where: { username } });

      if (alreadyExistsUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    if (email !== user.email) {
      const alreadyExistsEmail = await User.findOne({ where: { email } });

      if (alreadyExistsEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    user.title = title || user.title;
    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.email = email || user.email;
    user.telephone = telephone || user.telephone;
    user.username = username || user.username;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    if (!updatedUser) {
      return res.status(400).json({ message: 'Error updating user' });
    }

    return res.status(200).json({ status_code: 200, message: `User updated successfully ID: ${req.user.id}`, updated: updatedUser });
  } catch (error) {
    console.error('Error', error);
    return res
      .status(500)
      .json({ message: 'Error updating user data' });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    // Check user role
    if (req.user.role !== 'Admin' && req.user.role !== 'superAdmin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = await user.destroy();
    if (!deletedUser) {
      return res.status(400).json({ message: 'Error deleting user' });
    }

    return res.status(200).json({ status_code: 200, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = {
  createSuperAdminUser,
  createAdminUser,
  registerUser,
  loginUser,
  getUserInfo,
  getAllUser,
  getUserWithAllParams,
  updateUser,
  deleteUser,
};
