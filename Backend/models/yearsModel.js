module.exports = (sequelize, Datatypes) => {
    const Years = sequelize.define('years', {
        year_name: {
            type: Datatypes.STRING(5),
            allowNull: false
        }
    })
    return Years
}