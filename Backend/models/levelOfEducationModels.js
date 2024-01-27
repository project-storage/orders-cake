module.exports = (sequelize, DataTypes) => {
  const LFED = sequelize.define('levelOfEducations', {
    levelName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  })

  return LFED
}
