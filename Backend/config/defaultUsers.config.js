// Default user configuration for auto-creation
module.exports = {
  superAdmin: {
    title: process.env.SUPER_ADMIN_TITLE || 'Mr.',
    name: process.env.SUPER_ADMIN_NAME || 'Super',
    surname: process.env.SUPER_ADMIN_SURNAME || 'Admin',
    email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@example.com',
    username: process.env.SUPER_ADMIN_USERNAME || 'superadmin',
    password: process.env.SUPER_ADMIN_PASSWORD || 'password123',
    role: 'superAdmin',
  },
  admin: {
    title: process.env.ADMIN_TITLE || 'Mr.',
    name: process.env.ADMIN_NAME || 'Default',
    surname: process.env.ADMIN_SURNAME || 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    tel: process.env.ADMIN_TEL || '0123456789',
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'password123',
    role: 'Admin',
  },
  teacher: {
    title: process.env.TEACHER_TITLE || 'Mr.',
    name: process.env.TEACHER_NAME || 'Default',
    surname: process.env.TEACHER_SURNAME || 'Teacher',
    email: process.env.TEACHER_EMAIL || 'teacher@example.com',
    tel: process.env.TEACHER_TEL || '0123456789',
    username: process.env.TEACHER_USERNAME || 'teacher',
    password: process.env.TEACHER_PASSWORD || 'password123',
    role: 'advisor', // In this system, teachers are called 'advisor' role
  }
};