const dbConfig = require('../config/dbconfig')

const { Sequelize, DataTypes } = require('sequelize')

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
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database...')
  })
  .catch(err => {
    console.error('Error connecting to the database:', err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.bill = require('./BillModel')(sequelize, DataTypes)
db.department = require('./DepartmentModel')(sequelize, DataTypes)
db.oders = require('./OrderModel')(sequelize, DataTypes)
db.student = require('./StudentModel')(sequelize, DataTypes)
db.teacher = require('./TeacherModel')(sequelize, DataTypes)
db.team = require('./TeamModel')(sequelize, DataTypes)
db.user = require('./UserModel')(sequelize, DataTypes)
db.yearlevel = require('./YearLevellModel')(sequelize, DataTypes)
db.years = require('./YearsModel')(sequelize, DataTypes)
db.cake = require('./CakeModel')(sequelize, DataTypes)

// one to many year level and department
db.department.hasMany(db.yearlevel, {
  foreignKey: 'depart_id',
  as: 'yearlevels'
})
db.yearlevel.belongsTo(db.department, {
  foreignKey: 'depart_id',
  as: 'departments'
})

// one to many teacher and year level
db.teacher.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevel_id',
  as: 'yearlevel1',
});
db.teacher.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevel_id2',
  as: 'yearlevel2',
});
db.teacher.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevel_id3',
  as: 'yearlevel3',
});
db.yearlevel.hasMany(db.teacher, {
  foreignKey: 'yearlevel_id',
  as: 'teachers1',
});
db.yearlevel.hasMany(db.teacher, {
  foreignKey: 'yearlevel_id2',
  as: 'teachers2',
});
db.yearlevel.hasMany(db.teacher, {
  foreignKey: 'yearlevel_id3',
  as: 'teachers3',
});

// one to one studnet yearlevel
db.student.belongsTo(db.yearlevel, {
  foreignKey: 'yearlevel_id',
  as: 'yearlevels'
})
db.yearlevel.hasOne(db.student, {
  foreignKey: 'yearlevel_id',
  as: 'students'
})

// one to one student and department
db.student.belongsTo(db.department, {
  foreignKey: 'depart_id',
  as: 'departments'
})
db.department.hasOne(db.student, {
  foreignKey: 'depart_id',
  as: 'students'
})

// one to many student and teacher
db.student.belongsTo(db.teacher, {
  foreignKey: 'teach_id',
  as: 'teachers1'
})
db.student.belongsTo(db.teacher, {
  foreignKey: 'teach_id2',
  as: 'teachers2'
})
db.teacher.hasMany(db.student, {
  foreignKey: 'teach_id',
  as: 'students1'
})
db.teacher.hasMany(db.student, {
  foreignKey: 'teach_id2',
  as: 'students2'
})



db.sequelize.sync({ alter: true }).then(() => {
  console.log('yes re-sync done!!')
})

module.exports = db
