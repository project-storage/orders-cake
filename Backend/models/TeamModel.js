module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('teams', {
        teamName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('team'),
            allowNull: false
        }
    })
    return Team
}