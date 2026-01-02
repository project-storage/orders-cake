const { hashPassword } = require('./authHelper');
const db = require('../models');
const tb_user = db.tb_user;
const defaultUsersConfig = require('../config/defaultUsers.config');

/**
 * Auto-create super admin account if it doesn't exist
 */
const autoCreateSuperAdmin = async () => {
  try {
    // Check if a super admin already exists
    const existingSuperAdmin = await tb_user.findOne({ where: { role: "superAdmin" } });

    if (existingSuperAdmin) {
      console.log("Super admin user already exists. Skipping creation.");
      return existingSuperAdmin;
    }

    const superAdminData = defaultUsersConfig.superAdmin;

    // Check if username or email already exists
    const existingUser = await tb_user.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { username: superAdminData.username },
          { email: superAdminData.email }
        ]
      }
    });

    if (existingUser) {
      console.log("Username or email for super admin already exists. Skipping creation.");
      return existingUser;
    }

    // Hash the password
    const hashedPassword = await hashPassword(superAdminData.password);

    // Create the super admin user
    const newSuperAdmin = await tb_user.create({
      title: superAdminData.title,
      name: superAdminData.name,
      surname: superAdminData.surname,
      email: superAdminData.email,
      username: superAdminData.username,
      password: hashedPassword,
      role: superAdminData.role,
    });

    console.log("Super admin created successfully:", {
      id: newSuperAdmin.id,
      username: newSuperAdmin.username,
      email: newSuperAdmin.email,
      role: newSuperAdmin.role
    });

    return newSuperAdmin;
  } catch (error) {
    console.error('Error creating super admin:', error);
    throw error;
  }
};

/**
 * Auto-create admin account if it doesn't exist
 */
const autoCreateAdmin = async () => {
  try {
    // Check if an admin with the specified username already exists
    const adminUsername = defaultUsersConfig.admin.username;
    const existingAdmin = await tb_user.findOne({
      where: {
        username: adminUsername,
        role: 'Admin'
      }
    });

    if (existingAdmin) {
      console.log("Admin user already exists. Skipping creation.");
      return existingAdmin;
    }

    const adminData = defaultUsersConfig.admin;

    // Check if username or email already exists
    const existingUser = await tb_user.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { username: adminData.username },
          { email: adminData.email }
        ]
      }
    });

    if (existingUser) {
      console.log("Username or email for admin already exists. Skipping creation.");
      return existingUser;
    }

    // Hash the password
    const hashedPassword = await hashPassword(adminData.password);

    // Create the admin user
    const newAdmin = await tb_user.create({
      title: adminData.title,
      name: adminData.name,
      surname: adminData.surname,
      email: adminData.email,
      tel: adminData.tel,
      username: adminData.username,
      password: hashedPassword,
      role: adminData.role,
    });

    console.log("Admin created successfully:", {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role
    });

    return newAdmin;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};

/**
 * Auto-create teacher (advisor) account if it doesn't exist
 */
const autoCreateTeacher = async () => {
  try {
    // Check if a teacher (advisor) with the specified username already exists
    const teacherUsername = defaultUsersConfig.teacher.username;
    const existingTeacher = await tb_user.findOne({
      where: {
        username: teacherUsername,
        role: 'advisor'
      }
    });

    if (existingTeacher) {
      console.log("Teacher (advisor) user already exists. Skipping creation.");
      return existingTeacher;
    }

    const teacherData = defaultUsersConfig.teacher;

    // Check if username or email already exists
    const existingUser = await tb_user.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { username: teacherData.username },
          { email: teacherData.email }
        ]
      }
    });

    if (existingUser) {
      console.log("Username or email for teacher already exists. Skipping creation.");
      return existingUser;
    }

    // Hash the password
    const hashedPassword = await hashPassword(teacherData.password);

    // Create the teacher (advisor) user
    const newTeacher = await tb_user.create({
      title: teacherData.title,
      name: teacherData.name,
      surname: teacherData.surname,
      email: teacherData.email,
      tel: teacherData.tel,
      username: teacherData.username,
      password: hashedPassword,
      role: teacherData.role,
    });

    console.log("Teacher (advisor) created successfully:", {
      id: newTeacher.id,
      username: newTeacher.username,
      email: newTeacher.email,
      role: newTeacher.role
    });

    return newTeacher;
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
};

/**
 * Run all auto-creation functions
 */
const autoCreateAllUsers = async () => {
  console.log("Starting auto-creation of default users...");

  try {
    // Create super admin
    await autoCreateSuperAdmin();

    // Create admin
    await autoCreateAdmin();

    // Create teacher (advisor)
    await autoCreateTeacher();

    console.log("Auto-creation of default users completed successfully!");
  } catch (error) {
    console.error("Error during auto-creation of users:", error);
    throw error;
  }
};

module.exports = {
  autoCreateSuperAdmin,
  autoCreateAdmin,
  autoCreateTeacher,
  autoCreateAllUsers
};