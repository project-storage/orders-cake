const dbConfig = require('../config/dbconfig');

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

db.student = require('./studentModel')(sequelize, DataTypes);
db.teacher = require('./teacherModel')(sequelize, DataTypes);
db.team = require('./teamModel')(sequelize, DataTypes);
db.user = require('./userModel')(sequelize, DataTypes);
db.yearlevel = require('./yearLevellModel')(sequelize, DataTypes);
db.branch = require('./branchModel')(sequelize, DataTypes);
db.department = require('./departmentModel')(sequelize, DataTypes);
db.bill = require('./billModel')(sequelize, DataTypes);
db.cake = require('./cakeModel')(sequelize, DataTypes);
db.orderDetails = require('./orderDeTailsModel')(sequelize, DataTypes);
db.order = require('./orderModel')(sequelize, DataTypes);
db.turmSummary = require('./turmSummary')(sequelize, DataTypes)
db.stock = require('./stockModel')(sequelize, DataTypes)

// ----------- table year level -----------//
// one to many year level, department, and branch
db.department.hasMany(db.yearlevel, {
  foreignKey: 'departID',
  as: 'yearlevels'
});
db.yearlevel.belongsTo(db.department, {
  foreignKey: 'departID',
  as: 'departments'
});
db.branch.hasMany(db.yearlevel, {
  foreignKey: 'branchID',
  as: 'yearlevels'
});
db.yearlevel.belongsTo(db.branch, {
  foreignKey: 'branchID',
  as: 'branchs'
});

// ----------- table branch -----------//
// one to many branches and departments
db.department.hasMany(db.branch, {
  foreignKey: 'departID',
  as: 'branchs'
});
db.branch.belongsTo(db.department, {
  foreignKey: 'departID',
  as: 'departments'
});

// ----------- table teacher -----------//
// one to many teacher and year level
db.teacher.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevelID',
  as: 'yearlevel1',
});
db.teacher.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevelID2',
  as: 'yearlevel2',
});
db.teacher.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevelID3',
  as: 'yearlevel3',
});
db.yearlevel.hasMany(db.teacher, {
  foreignKey: 'yearlevelID',
  as: 'teachers1',
});
db.yearlevel.hasMany(db.teacher, {
  foreignKey: 'yearlevelID2',
  as: 'teachers2',
});
db.yearlevel.hasMany(db.teacher, {
  foreignKey: 'yearlevelID3',
  as: 'teachers3',
});

// ----------- table student -----------//
// one to many student and teacher
db.student.belongsTo(db.teacher, {
  foreignKey: 'teachID',
  as: 'teachers1'
});
db.student.belongsTo(db.teacher, {
  foreignKey: 'teachID2',
  as: 'teachers2'
});
db.teacher.hasMany(db.student, {
  foreignKey: 'teachID',
  as: 'students1'
});
db.teacher.hasMany(db.student, {
  foreignKey: 'teachID2',
  as: 'students2'
});

// One-to-many relationship: One year level has many students
db.yearlevel.hasMany(db.student, {
  foreignKey: 'yearlevelID',
  as: 'students'
});

// Define the reverse relationship: Many students belong to one year level
db.student.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevelID',
  as: 'yearlevel'
});

// one to many students and branch
db.branch.hasMany(db.student, {
  foreignKey: 'branchID',
  as: 'students'
});
db.student.belongsTo(db.branch, {
  foreignKey: 'branchID',
  as: 'branch'
});

// one to one student and department
db.student.belongsTo(db.department, {
  foreignKey: 'departID',
  as: 'department'
});
db.department.hasOne(db.student, {
  foreignKey: 'departID',
  as: 'student'
});

// ----------- table order master -----------//
db.order.hasMany(db.orderDetails,{
  foreignKey:'orderID',
  as:'orderDetails'
})
db.orderDetails.belongsTo(db.order,{
  foreignKey:'orderID',
  as:'orderInOrderDetails'
})

db.cake.hasMany(db.orderDetails,{
  foreignKey:'cakeID',
  as:'orderDetails'
})
db.orderDetails.belongsTo(db.cake,{
  foreignKey:'cakeID',
  as:'cakeInOrderDetails'
})

// ----------- table order  -----------//
db.student.hasMany(db.order,{
  foreignKey:'stuID',
  as:'orders'
})
db.order.belongsTo(db.student,{
  foreignKey:'stuID',
  as:'studentInOrder'
})

db.team.hasMany(db.order,{
  foreignKey:'teamID',
  as:'orders'
})
db.order.belongsTo(db.team,{
  foreignKey:'teamID',
  as:'teamsInOrder'
})

db.teacher.hasMany(db.order,{
  foreignKey:'teachID',
  as:'orders'
})
db.order.belongsTo(db.teacher,{
  foreignKey:'stuID',
  as:'teachersInOrder'
})
// ----------- table TurmSummary  -----------//
// one to many TurmSummary and orderDetails
db.order.hasMany(db.turmSummary, {
  foreignKey: 'orderID',
  as: 'turmSummarys'
});
db.turmSummary.belongsTo(db.order, {
  foreignKey: 'orderID',
  as: 'ordersInTurm'
});

// ----------- table stocks  -----------//
// one to many cake and stock
db.cake.hasMany(db.stock, {
  foreignKey: 'cakeID',
  as: 'stocks'
});
db.stock.belongsTo(db.cake, {
  foreignKey: 'cakeID',
  as: 'cakesStock'
});


db.sequelize.sync({ alter: true }).then(() => {
  console.log('Yes re-sync done!!');
});

module.exports = db;
