module.exports = (sequelize, DataTypes) => {
    const memberTeam = sequelize.define('memberTeams', {
        teamID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stuID1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stuID1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stuID2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stuID3: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stuID4: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stuID5: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return memberTeam
}
