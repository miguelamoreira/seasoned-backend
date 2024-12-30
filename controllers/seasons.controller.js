const db = require("../models/index.js");
const { ValidationError, Sequelize, where } = require("sequelize");
const axios = require('axios');

const Seasons = db.Seasons;

// returns all episodes of a season
exports.findAllEpisodesBySeasonId = async (req, res) => {
    const seasonId = req.params.id;
    const BASE_URL = `https://api.tvmaze.com/seasons/${seasonId}/episodes`;

    try {
        const response = await axios.get(BASE_URL);

        if (!response || !response.data || response.data.length === 0) {
            return res.status(404).json({
                message: `No episodes found for season with ID: ${seasonId}`
            });
        }

        return res.status(200).json({
            message: `Episodes of season ${seasonId} retrieved successfully`,
            data: response.data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        });
    }
};
