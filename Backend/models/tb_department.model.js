module.exports = (sequelize, DataTypes) => {
    const tb_department = sequelize.define('tb_department', {
      departCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      departName: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    })
  
    return tb_department
  }
  