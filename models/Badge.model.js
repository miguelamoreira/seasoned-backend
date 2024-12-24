module.exports = (sequelize, DataTypes) => {
    const Badge = sequelize.define("Badge", {
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
    })
    return Badge
}