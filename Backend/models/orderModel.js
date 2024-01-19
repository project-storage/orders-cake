module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('orders', {
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
        dateBuy: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeBuy: {
            type: DataTypes.TIME,
            allowNull: false
        },
        pickupDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        pickupTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("จ่ายเต็มจำนวน", "จ่ายแบบมัดจำ"),
            allowNull: true
        },
        depositPrice: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        remainingPrice: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })
    return Order
}