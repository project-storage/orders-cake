module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('orders', {
    stu_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cake_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalPound: {
      type: DataTypes.DECIMAL(5, 1),
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
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    orderTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

  return Order
}
