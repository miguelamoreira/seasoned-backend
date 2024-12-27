module.exports = (sequelize, DataTypes) => {
    const EarnedBadge = sequelize.define("EarnedBadge", {
        user_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true 
        },
        badge_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true 
        },
        earned_date: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        },
    },{
        timestamps: false, 
    })
    return EarnedBadge
}