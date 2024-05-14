module.exports = (sequelize, DataTypes) => {
    const tb_student = sequelize.define('tb_student', {
        stuNumber: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        stuIdCard: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        groupID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })

    return tb_student
}
