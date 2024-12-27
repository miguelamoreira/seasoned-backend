module.exports = (sequelize, DataTypes) => {
    const FriendsActivities = sequelize.define('FriendsActivities', {
        activity_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        activity_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },{
        timestamps: false, 
    })
    return FriendsActivities
}