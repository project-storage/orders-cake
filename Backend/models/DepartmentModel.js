module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    departName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  })

  return Department
}
