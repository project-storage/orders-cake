module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teachers', {
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
      allowNull: true
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
      type: DataTypes.ENUM('teacher'),
      allowNull: false
    },
  })

  return Teacher
}
