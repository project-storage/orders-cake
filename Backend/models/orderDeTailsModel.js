module.exports = (sequelize, DataTypes) => {
  const orderDetails = sequelize.define('orderDetails', {
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

  return orderDetails
}
