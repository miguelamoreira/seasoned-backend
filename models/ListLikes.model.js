module.exports = (sequelize, DataTypes) => {
    const ListLikes = sequelize.define('ListLikes', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        list_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        like_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    },{
        timestamps: false, 
    })
    return ListLikes
}