module.exports = (sequelize, DataTypes) => {
  const Yearlevel = sequelize.define('yearlevel', {
    levelName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    branchID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  return Yearlevel
}
