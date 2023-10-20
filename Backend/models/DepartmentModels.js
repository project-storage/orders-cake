module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("department", {
        department_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    })

    return Department
}