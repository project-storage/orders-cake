module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    title: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    stu_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stu_IdCard: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    stu_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stu_surname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stu_telephone: {
      type: DataTypes.STRING(10),
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
