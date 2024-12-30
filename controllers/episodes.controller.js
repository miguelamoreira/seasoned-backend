const db = require("../models/index.js");
const { ValidationError, Sequelize, where } = require("sequelize");
const axios = require('axios');

const Episodes = db.Episodes;

// returns all the info about an episode
exports.findEpisodeById = async (req, res) => {
    const episodeId = req.params.id; 
    const BASE_URL = `https://api.tvmaze.com/episodes/${episodeId}`;

    try {
        const response = await axios.get(BASE_URL);

        return res.status(200).json({
            message: `Episode with ${episodeId} retrieved successfully`,
            data: response.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}