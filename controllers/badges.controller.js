const db = require("../models/index.js");
const { ValidationError, Sequelize, where } = require("sequelize");

const Badge = db.Badges;

exports.getFindAllBadges = async (req, res) => {
    try {
        const badges = await Badge.findAll();

        return res.status(200).json({
            message: 'Badges retrieved successfully',
            data: badges,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}

exports.getBadgeById = async (req, res) => {
    const badgeId = req.params.id;

    try {
        const badge = await Badge.findOne({ where: { badge_id: badgeId } });

        if (!badge) {
            return res.status(404).json({
                message: 'Badge not found'
            })
        }

        return res.status(200).json({
            message: `Badge ${badgeId} retrieve successfully`,
            data: badge
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}