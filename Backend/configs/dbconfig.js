require('dotenv').config({ path: '../config.env' });

module.exports = {
    HOST: process.env.MYSQL_URL || 'localhost',
    PORT: process.env.MYSQL_PORT || 3306,
    USER: process.env.MYSQL_USER || 'root',
    PASSWORD: process.env.MYSQL_PASSWORD || '',
    DB: process.env.MYSQL_DB || 'order_cake',
    dialect: 'mysql',
    logging: process.env.NODE_ENV !== 'production', // Enable logging in non-production environments
    pool: {
        max: parseInt(process.env.DB_POOL_MAX) || 5,
        min: parseInt(process.env.DB_POOL_MIN) || 0,
        acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
        idle: parseInt(process.env.DB_POOL_IDLE) || 10000
    },
    // Additional security and performance options
    define: {
        freezeTableName: true, // Prevent table name pluralization
        underscored: true, // Use snake_case for attributes
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    },
    dialectOptions: {
        // Security options for MySQL connection
        connectTimeout: 60000,
        requestTimeout: 60000,
    }
};