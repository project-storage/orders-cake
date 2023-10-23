module.exports = (sequelize, DataTypes) => {
    const Yearlevel = sequelize.define("yearlevel", {
        level_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        depart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })

    return Yearlevel
}