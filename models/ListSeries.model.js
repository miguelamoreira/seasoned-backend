module.exports = (sequelize, DataTypes) => {
    const ListSeries = sequelize.define('ListSeries', {
        list_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        series_api_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    })
    return ListSeries
}