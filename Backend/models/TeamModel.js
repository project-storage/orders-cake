module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('teams', {
        teamName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    })
    return Team
}