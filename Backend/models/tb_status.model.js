module.exports = (sequelize, DataTypes) => {
    const tb_status = sequelize.define('tb_status', {
        statusName: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    })
    return tb_status
}