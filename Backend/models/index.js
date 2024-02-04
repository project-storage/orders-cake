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
db.memberTeam = require('./memberTeamModel')(sequelize, DataTypes)

db.degree = require('./degreeModel')(sequelize, DataTypes);
db.department = require('./departmentModel')(sequelize, DataTypes);
db.group = require('./groupModel')(sequelize, DataTypes)

db.cake = require('./cakeModel')(sequelize, DataTypes);
db.poundType = require('./poundTypeModel')(sequelize, DataTypes)
db.orderDetail = require('./orderDetail')(sequelize, DataTypes);
db.order = require('./orderModel')(sequelize, DataTypes);
db.status = require('./statusModel')(sequelize, DataTypes)

// ----------- table group -----------//
// one to many year level, department, and branch
db.department.hasMany(db.group, {
  foreignKey: 'departID',
  as: 'groups'
});
db.group.belongsTo(db.department, {
  foreignKey: 'departID',
  as: 'departments'
});
db.degree.hasMany(db.group, {
  foreignKey: 'degreeID',
  as: 'groups'
});
db.group.belongsTo(db.degree, {
  foreignKey: 'degreeID',
  as: 'degrees'
});
db.teacher.hasMany(db.group, {
  foreignKey: 'teachID',
  as: 'groups'
});
db.group.belongsTo(db.teacher, {
  foreignKey: 'teachID',
  as: 'teachers'
});

// // ----------- table student -----------//
// one to one student and department
db.student.belongsTo(db.group, {
  foreignKey: 'groupID',
  as: 'groups'
});
db.group.hasOne(db.student, {
  foreignKey: 'groupID',
  as: 'student'
});

// // ----------- table team -----------//
db.memberTeam.hasMany(db.team, {
  foreignKey: 'teamID',
  as: 'teams'
})
db.team.belongsTo(db.memberTeam, {
  foreignKey: 'teamID',
  as: 'memberTeams'
})

// team and studnet
db.memberTeam.belongsTo(db.student, {
  foreignKey: 'stuID1',
  as: 'student1'
})
db.memberTeam.belongsTo(db.student, {
  foreignKey: 'stuID2',
  as: 'student2'
})
db.memberTeam.belongsTo(db.student, {
  foreignKey: 'stuID3',
  as: 'student3'
})
db.memberTeam.belongsTo(db.student, {
  foreignKey: 'stuID4',
  as: 'student4'
})
db.memberTeam.belongsTo(db.student, {
  foreignKey: 'stuID5',
  as: 'student5'
})

db.student.hasMany(db.memberTeam, {
  foreignKey: 'stuID1',
  as: 'memberTeams1'
})
db.student.hasMany(db.memberTeam, {
  foreignKey: 'stuID2',
  as: 'memberTeams2'
})
db.student.hasMany(db.memberTeam, {
  foreignKey: 'stuID3',
  as: 'memberTeams3'
})
db.student.hasMany(db.memberTeam, {
  foreignKey: 'stuID4',
  as: 'memberTeams4'
})
db.student.hasMany(db.memberTeam, {
  foreignKey: 'stuID5',
  as: 'memberTeams5'
})

// // ----------- table order detail -----------//
db.order.hasMany(db.orderDetail, {
  foreignKey: 'orderID',
  as: 'orders'
})
db.orderDetail.belongsTo(db.order, {
  foreignKey: 'orderID',
  as: 'orderDetails'
})

db.cake.hasMany(db.orderDetail, {
  foreignKey: 'cakeID',
  as: 'cakes'
})
db.orderDetail.belongsTo(db.cake, {
  foreignKey: 'cakeID',
  as: 'cakeInOrderDetails'
})

// // ----------- table order  -----------//
db.student.hasMany(db.order, {
  foreignKey: 'stuID',
  as: 'orders'
})
db.order.belongsTo(db.student, {
  foreignKey: 'stuID',
  as: 'students'
})

db.team.hasMany(db.order, {
  foreignKey: 'teamID',
  as: 'orders'
})
db.order.belongsTo(db.team, {
  foreignKey: 'teamID',
  as: 'team'
})

db.status.hasMany(db.order, {
  foreignKey: 'statusID',
  as: 'orders'
})
db.order.belongsTo(db.status, {
  foreignKey: 'statusID',
  as: 'statuses'
})

// ----------- table cake  -----------//
db.poundType.hasMany(db.cake, {
  foreignKey: 'poundID',
  as: 'cakes'
});
db.cake.belongsTo(db.poundType, {
  foreignKey: 'orderID',
  as: 'poundTypes'
});


db.sequelize.sync({ alter: true }).then(() => {
  console.log('Yes re-sync done!!');
});

module.exports = db;
