module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    depart_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  })

  return Department
}
