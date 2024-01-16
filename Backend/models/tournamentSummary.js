module.exports = (sequelize, DataTypes) => {
    const TournamentSummary = sequelize.defilne('tournamentSummarys', {
        orderMasterID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return TournamentSummary
}