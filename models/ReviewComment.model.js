module.exports = (sequelize, DataTypes) => {
    const ReviewComment = sequelize.define('ReviewComment', {
        comment_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true, 
        },
        user_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        review_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        comment: { 
            type: DataTypes.TEXT, 
            allowNull: false 
        },
        comment_date: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        },
    },{
        timestamps: false, 
    })
    return ReviewComment
}