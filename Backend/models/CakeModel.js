module.exports = (sequelize, DataTypes) => {
    const Cake = sequelize.define('cakes', {
        cakeName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        pound: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        // image: {
        //     type: DataTypes.BLOB('long'),
        // }
    })

    return Cake
}