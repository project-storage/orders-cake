module.exports = (sequelize, DataTypes) => {
    const tb_degree = sequelize.define('tb_degree', {
        degreeName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    })

    return tb_degree
}
