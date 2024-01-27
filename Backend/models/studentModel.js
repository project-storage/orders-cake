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
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    telephone: {
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
    groupID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  })

  return Student
}
