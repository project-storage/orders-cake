module.exports = (sequelize, DataTypes) => {
    const tourSummary = sequelize.define('tournamentSummarys', {
        orderID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return tourSummary
}