module.exports = (sequelize, Datatypes) => {
    const Years = sequelize.defind('years', {
        year_name: {
            type: Datatypes.STRING(5),
            allowNull: false
        }
    })
    return Years
}