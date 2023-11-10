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

db.user = require('./userModels')(sequelize, DataTypes)
db.oders = require('./orderModels')(sequelize, DataTypes)
db.student = require('./studentModels')(sequelize, DataTypes)
db.teacher = require('./teacherModels')(sequelize, DataTypes)
db.department = require('./DepartmentModels')(sequelize, DataTypes)
db.yearlevel = require('./YearLevellModels')(sequelize, DataTypes)

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
  as: 'yearlevels',
});
db.yearlevel.hasMany(db.teacher, {
  foreignKey: 'yearlevel_id',
  as: 'teachers',
});

db.student.hasOne(db.yearlevel,{
  foreignKey:'yearlevel_id',
  as:'yearlevels'
})
db.yearlevel.belongsTo(db.student,{
  foreignKey:'yearlevel_id',
  as:'students'
})
db.sequelize.sync({ alter: true }).then(() => {
  console.log('yes re-sync done!!')
})

module.exports = db
