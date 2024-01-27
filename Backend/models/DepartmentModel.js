module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('departments', {
    departCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  })

  return Department
}
