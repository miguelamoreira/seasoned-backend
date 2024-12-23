module.exports = (sequelize, DataTypes) => {
    const PreferredGenre = sequelize.define('PreferredGenre', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        genre_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    })
    return PreferredGenre
}