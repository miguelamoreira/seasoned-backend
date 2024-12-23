module.exports = (sequelize, DataTypes) => {
    const PreferredGenre = sequelize.define('PreferredGenre', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        genre_name: {
            type: DataTypes.STRING,
            primaryKey: true,
        }
    })
    return PreferredGenre
}