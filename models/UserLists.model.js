module.exports = (sequelize, DataTypes) => {
    const ListLikes = sequelize.define('ListLikes', {
        list_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    })
    return ListLikes
}