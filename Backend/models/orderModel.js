module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('orders', {
        orderID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        teachID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })
    return Order
}