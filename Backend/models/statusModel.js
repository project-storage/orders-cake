module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('statuses', {
        statusName: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    })
    return Status
}