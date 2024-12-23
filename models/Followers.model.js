module.exports = (sequelize, DataTypes) => {
    const Followers = sequelize.define('Followers', {
        user1_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user2_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        follower_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    })
    return Followers
}