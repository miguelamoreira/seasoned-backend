module.exports = (sequelize, DataTypes) => {
    const Following = sequelize.define('Following', {
        user1_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user2_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        following_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    })
    return Following
}