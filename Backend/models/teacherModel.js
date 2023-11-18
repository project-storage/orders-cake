module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teachers', {
    title: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    teach_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    teach_surname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    teach_telephone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    teach_email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    teach_username: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    teach_password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('teacher'),
      allowNull: false
    },
    yearlevel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    yearlevel_id2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    yearlevel_id3: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })

  return Teacher
}
