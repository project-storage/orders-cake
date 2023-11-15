module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('orders', {
    stu_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cake_butter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cake_jam: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cake_coffe: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cake_choco: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pound1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pound2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pound3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pound4: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pound5: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty_pound: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty_money: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date:{
      type:DataTypes.DATE,
      allowNull: true
    }
  })

  return Order
}
