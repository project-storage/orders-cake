module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('teams', {
        teamType: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        teamName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    })
    return Team
}