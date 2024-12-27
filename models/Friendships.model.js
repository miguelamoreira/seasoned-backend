module.exports = (sequelize, DataTypes) => {
    const Friendships = sequelize.define('Friendships', {
        user1_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user2_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        friendship_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },{
        timestamps: false, 
        freezeTableName: true,
    })
    return Friendships
}