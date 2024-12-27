module.exports = (sequelize, DataTypes) => {
    const ReviewLike = sequelize.define("ReviewLike", {
        user_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true 
        },
        review_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true 
        },
        like_date: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        },
    },{
        timestamps: false, 
    })
    return ReviewLike;
}