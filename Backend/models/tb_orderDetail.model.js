module.exports = (sequelize, DataTypes) => {
    const tb_orderDetail = sequelize.define('tb_orderDetail', {
      orderID: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      cakeID: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      totalCake: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      totalPoundsAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
    })
  
    return tb_orderDetail
  }
  