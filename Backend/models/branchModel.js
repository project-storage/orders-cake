module.exports = (sequelize, DataTypes) => {
    const Branch = sequelize.define('branchs', {
        branchName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        departID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })
    return Branch
}