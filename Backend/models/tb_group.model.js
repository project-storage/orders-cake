module.exports = (sequelize, DataTypes) => {
    const tb_group = sequelize.define('tb_group', {
        roomName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        teachID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        departID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        degreeID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
    return tb_group
}