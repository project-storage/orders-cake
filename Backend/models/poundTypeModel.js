module.exports = (sequelize, DataTypes) => {
    const PoundType = sequelize.define('poundTypes', {
        pound: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    })
    return PoundType
}