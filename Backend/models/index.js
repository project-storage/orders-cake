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
db.orderMaster = require('./orderMasterlModel')(sequelize, DataTypes);
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
  as: 'branch'
});

// ----------- table branch -----------//
// one to many branches and departments
db.branch.hasMany(db.department, {
  foreignKey: 'branchID',
  as: 'departments'
});
db.department.belongsTo(db.branch, {
  foreignKey: 'branchID',
  as: 'branch'
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

// one to one student year level
db.student.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevelID',
  as: 'yearlevel'
});
db.yearlevel.hasOne(db.student, {
  foreignKey: 'yearlevelID',
  as: 'student'
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
// one to many students and orderMaster
db.student.belongsTo(db.orderMaster, {
  foreignKey: 'stuID',
  as: 'orderMasters'
});
db.orderMaster.hasMany(db.student, {
  foreignKey: 'stuID',
  as: 'students'
});

// one to many team and orderMaster
db.team.belongsTo(db.orderMaster, {
  foreignKey: 'teamID',
  as: 'orderMasters'
})
db.orderMaster.hasMany(db.team, {
  foreignKey: 'teamID',
  as: 'teams'
})

// one to many teacher and orderMaster
db.teacher.belongsTo(db.orderMaster, {
  foreignKey: 'teachID',
  as: 'orderMasters'
})
db.orderMaster.hasMany(db.teacher, {
  foreignKey: 'teachID',
  as: 'teachers'
})

// ----------- table order  -----------//
// one to one orderMaster and order
db.orderMaster.hasOne(db.order, {
  foreignKey: 'orderMasterID',
  as: 'orders'
});
db.order.belongsTo(db.orderMaster, {
  foreignKey: 'orderMasterID',
  as: 'orderMaster'
});

// one to many teacher and orders
db.teacher.belongsTo(db.order, {
  foreignKey: 'teachID',
  as: 'orders'
})
db.order.hasMany(db.teacher, {
  foreignKey: 'teachID',
  as: 'teachers'
})

// ----------- table TurmSummary  -----------//
// one to many TurmSummary and orderMaster
db.orderMaster.belongsTo(db.turmSummary, {
  foreignKey: 'orderMasterID',
  as: 'turmSummarys'
});
db.turmSummary.hasMany(db.orderMaster, {
  foreignKey: 'orderMasterID',
  as: 'orderMasters'
});

// ----------- table stocks  -----------//
// one to many cake and stock
db.cake.belongsTo(db.stock, {
  foreignKey: 'cakeID',
  as: 'stocks'
});
db.stock.hasMany(db.cake, {
  foreignKey: 'cakeID',
  as: 'cakes'
});


db.sequelize.sync({ alter: true }).then(() => {
  console.log('Yes re-sync done!!');
});

module.exports = db;
