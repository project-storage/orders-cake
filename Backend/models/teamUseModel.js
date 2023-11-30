module.exports = (sequelize, DataTypes) => {
    const teamUse = sequelize.define('team_uses', {
        team_type: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        team_username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        team_password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        team_telephone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        member1: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        member2: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        member3: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        member4: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        member5: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM("team"),
            allowNull: true
        }
    })
    return teamUse
}