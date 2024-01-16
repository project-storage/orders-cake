module.exports = (sequelize, DataTypes) => {
  const orderMaster = sequelize.define('orderMaster', {
    stuID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teamID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teachID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cakeButter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cakeJam: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cakeCoffee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cakeChocolate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalCake: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Pound1: {
      type: DataTypes.DECIMAL(5, 1),
      allowNull: false
    },
    Pound2: {
      type: DataTypes.DECIMAL(5, 1),
      allowNull: false
    },
    Pound3: {
      type: DataTypes.DECIMAL(5, 1),
      allowNull: false
    },
    Pound4: {
      type: DataTypes.DECIMAL(5, 1),
      allowNull: false
    },
    Pound5: {
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
    dateBuy: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pickupDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pickupTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

  return orderMaster
}
