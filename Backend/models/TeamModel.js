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
        username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        teamTelephone: {
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
        remeke: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("team"),
            allowNull: true
        }
    })
    return Team
}