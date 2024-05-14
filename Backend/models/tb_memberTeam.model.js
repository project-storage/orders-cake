module.exports = (sequelize, DataTypes) => {
    const tb_memberTeam = sequelize.define('tb_memberTeam', {
        teamID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stuID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        // stuID2: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // stuID3: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // stuID4: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // stuID5: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
    })
    return tb_memberTeam
}
