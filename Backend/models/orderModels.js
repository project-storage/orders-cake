module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("orders", {
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cake_butter: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cake_jam: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cake_coffe: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cake_choco: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pound1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pound2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pound3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pound4: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pound5: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        qtypound: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        qtymoney: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    return Order
}