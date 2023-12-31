module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    stuNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stuIdCard: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    stuNane: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stuSurname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stuTelephone: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('student'),
      allowNull: true
    },
    yearlevel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    depart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teach_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teach_id2: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })

  return Student
}
