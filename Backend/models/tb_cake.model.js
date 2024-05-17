module.exports = (sequelize, DataTypes) => {
    const tb_cake = sequelize.define('tb_cake', {
        cakeName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
    })

    return tb_cake
}