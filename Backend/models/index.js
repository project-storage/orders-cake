const dbConfig = require('../configs/dbconfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database...');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tb_user = require('./tb_user.model')(sequelize, DataTypes);
db.tb_student = require('./tb_student.model')(sequelize, DataTypes);
db.tb_team = require('./tb_team.model')(sequelize, DataTypes);
db.tb_memberTeam = require('./tb_memberTeam.model')(sequelize, DataTypes);
db.tb_degree = require('./tb_degree.model')(sequelize, DataTypes);
db.tb_department = require('./tb_department.model')(sequelize, DataTypes);
db.tb_group = require('./tb_group.model')(sequelize, DataTypes);
db.tb_cake = require('./tb_cake.model')(sequelize, DataTypes);
db.tb_order = require('./tb_order.model')(sequelize, DataTypes);
db.tb_orderDetail = require('./tb_orderDetail.model')(sequelize, DataTypes);
db.tb_status = require('./tb_status.model')(sequelize, DataTypes);

// ----------- table group -----------//
// One to many between department and group
db.tb_department.hasMany(db.tb_group, {
    foreignKey: 'departID',
    as: 'groups'
});

db.tb_group.belongsTo(db.tb_department, {
    foreignKey: 'departID',
    as: 'department'
});

// One to many between degree and group
db.tb_degree.hasMany(db.tb_group, {
    foreignKey: 'degreeID',
    as: 'groups'
});

db.tb_group.belongsTo(db.tb_degree, {
    foreignKey: 'degreeID',
    as: 'degree'
});

// One to many between user (teacher) and group
db.tb_user.hasMany(db.tb_group, {
    foreignKey: 'teachID',
    as: 'groups'
});

db.tb_group.belongsTo(db.tb_user, {
    foreignKey: 'teachID',
    as: 'teacher'
});

// ----------- table student -----------//
// One to one between student and group
db.tb_student.belongsTo(db.tb_group, {
    foreignKey: 'groupID',
    as: 'group'
});

db.tb_group.hasOne(db.tb_student, {
    foreignKey: 'groupID',
    as: 'student'
});

// ----------- table team -----------//
// One to many between team and member team
db.tb_memberTeam.belongsTo(db.tb_team, {
    foreignKey: 'teamID',
    as: 'team'
});

db.tb_team.hasMany(db.tb_memberTeam, {
    foreignKey: 'teamID',
    as: 'members'
});

// One to many between student and member team
db.tb_student.hasMany(db.tb_memberTeam, {
    foreignKey: 'stuID',
    as: 'memberTeams'
});

db.tb_memberTeam.belongsTo(db.tb_student, {
    foreignKey: 'stuID',
    as: 'student'
});

// ----------- table order detail -----------//
// One to many between order and order detail
db.tb_order.hasMany(db.tb_orderDetail, {
    foreignKey: 'orderID',
    as: 'orderDetails'
});

db.tb_orderDetail.belongsTo(db.tb_order, {
    foreignKey: 'orderID',
    as: 'order'
});

// One to many between cake and order detail
db.tb_cake.hasMany(db.tb_orderDetail, {
    foreignKey: 'cakeID',
    as: 'orderDetails'
});

db.tb_orderDetail.belongsTo(db.tb_cake, {
    foreignKey: 'cakeID',
    as: 'cake'
});

// ----------- table order -----------//
// One to many between student and order
db.tb_student.hasMany(db.tb_order, {
    foreignKey: 'stuID',
    as: 'orders'
});

db.tb_order.belongsTo(db.tb_student, {
    foreignKey: 'stuID',
    as: 'student'
});

// One to many between team and order
db.tb_team.hasMany(db.tb_order, {
    foreignKey: 'teamID',
    as: 'orders'
});

db.tb_order.belongsTo(db.tb_team, {
    foreignKey: 'teamID',
    as: 'team'
});

// One to many between status and order
db.tb_status.hasMany(db.tb_order, {
    foreignKey: 'statusID',
    as: 'orders'
});

db.tb_order.belongsTo(db.tb_status, {
    foreignKey: 'statusID',
    as: 'status'
});

db.sequelize.sync({ force: false }).then(() => {
    console.log('Yes sync done!!');
});

module.exports = db;
