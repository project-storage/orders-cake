module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('superAdmin','admin', 'DepatMoney', 'DepatCake'),
            allowNull: true
        }
    })

    return User;
}