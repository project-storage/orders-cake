module.exports = (sequelize, DataTypes) => {
    const tb_order = sequelize.define('tb_order', {
        bookNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        orderNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stuID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teamID: {
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
        statusID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        depositPrice: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        remainingPrice: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        teachID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return tb_order
}