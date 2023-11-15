module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('bills', {
        bill_number: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Bill
}