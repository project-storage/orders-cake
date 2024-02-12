module.exports = (sequelize, DataTypes) => {
    const Cake = sequelize.define('cakes', {
        cakeName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        poundID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // image: {
        //     type: DataTypes.BLOB('long'),
        // }
    })

    return Cake
}