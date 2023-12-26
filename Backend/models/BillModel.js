module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('bills', {
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        billNumber: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        PaymentStatus: {
            type: DataTypes.ENUM("PayFull", "PayDeposit")
        }
    })
    return Bill
}