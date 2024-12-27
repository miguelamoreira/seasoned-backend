module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        genre_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        genre_name: {
            type: DataTypes.TEXT,
        },
        
    },{
        timestamps: false, 
    })
    return Genre
}