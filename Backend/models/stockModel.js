module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('stocks', {
        cakeID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalNumberCake: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateAdded: {
            type: DataTypes.DATE,
            allowNull: false
        },
        numberAdded: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        datePickup: {
            type: DataTypes.DATE,
            allowNull: false
        },
        numberPickup: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
    return Stock
}