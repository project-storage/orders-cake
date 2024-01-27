module.exports = (sequelize, DataTypes) => {
  const Degree = sequelize.define('degrees', {
    degreeName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  })

  return Degree
}
