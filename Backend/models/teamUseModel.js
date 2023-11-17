module.exports = (sequelize, DataTypes) => {
    const teamUse = sequelize.define('team_uses', {
        type_team: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        team_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        team_telephone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        member1: {
            type: DataTypes.STRING(100),
            allowNull: true
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
        }
    })
    return teamUse
}