module.exports = (sequelize, DataTypes) => {
    const tb_team = sequelize.define('tb_team', {
        teamName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        teamType: {
            type: DataTypes.STRING(20),
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
    return tb_team
}