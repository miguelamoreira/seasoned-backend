module.exports = (sequelize, DataTypes) => {
    const Badges = sequelize.define("Badges", {
        badge_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true, 
        },
        name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        description: { 
            type: DataTypes.TEXT, 
            allowNull: false 
        },
    },{
        timestamps: false,
        freezeTableName: true, 
    })
    return Badges
}