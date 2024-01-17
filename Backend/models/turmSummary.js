module.exports = (sequelize, DataTypes) => {
    const TurmSummary = sequelize.define('TurmSummarys', {
        orderMasterID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return TurmSummary
}