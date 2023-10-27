module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    stu_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stu_Idcard: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stu_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stu_surname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stu_telephone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    stu_email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    stu_username: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    stu_password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('student'),
      allowNull: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  return Student
}
