module.exports = (sequelize, DataTypes) => {
    const YearLavel = sequelize.define("yearlavel", {
        lavel_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        depart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })

    return YearLavel
}