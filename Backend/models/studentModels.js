module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    stu_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stu_IdCard: {
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
      type: DataTypes.STRING(15),
      allowNull: false
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
    yearlevel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teacher_id2: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })

  return Student
}
