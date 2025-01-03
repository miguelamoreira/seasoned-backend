module.exports = (sequelize, DataTypes) => {
    const Ratings = sequelize.define('Ratings', {
        rating_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        episode_api_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 },
        },
        comment: {
            type: DataTypes.TEXT,
        },
        rating_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },{
        timestamps: false, 
        freezeTableName: true,
    })
    return Ratings;
}