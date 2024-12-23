module.exports = (sequelize, DataTypes) => {
    const SeriesReview = sequelize.define('SeriesReview', {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        series_api_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 }
        },
        reviewDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    })
    return SeriesReview;
}