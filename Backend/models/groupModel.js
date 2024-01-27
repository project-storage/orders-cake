module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('groups', {
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
    return Group
}