module.exports = (sequelize, DataTypes) => {
    const EpisodeLikes = sequelize.define('EpisodeLikes', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        activity_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        like_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    })
    return EpisodeLikes
}