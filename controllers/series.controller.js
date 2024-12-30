const db = require("../models/index.js");
const { ValidationError, Sequelize, where } = require("sequelize");
const axios = require('axios');

const Series = db.Series;

// returns all series with pagination (24 results per page)
exports.findAllSeries = async (req, res) => {
    const BASE_URL = 'https://api.tvmaze.com/shows';

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 24;

    try {
        const response = await axios.get(BASE_URL);

        const totalSeries = response.data.length;
        const totalPages = Math.ceil(totalSeries / perPage);

        const start = (page - 1) * perPage;
        const end = start + perPage;
        const seriesPage = response.data.slice(start, end);

        return res.status(200).json({ 
            message: 'Series retrieved successfully',
            page,
            perPage,
            totalSeries,
            totalPages,
            data: seriesPage
         })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}

// return a series by its id
exports.findSeriesById = async (req, res) => {
    const seriesId = req.params.id; 
    const BASE_URL = `https://api.tvmaze.com/shows/${seriesId}`;

    try {
        const response = await axios.get(BASE_URL);

        return res.status(200).json({
            message: `Series with ${seriesId} retrieved successfully`,
            data: response.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}

// returns all seasons of a series by its id
exports.findAllSeasonsBySeriesId = async (req, res) => {
    const seriesId = req.params.id; 
    const BASE_URL = `https://api.tvmaze.com/shows/${seriesId}/seasons`;

    try {
        const response = await axios.get(BASE_URL);

        if (!response || !response.data || response.data.length === 0) {
            return res.status(404).json({
                message: `No seasons found for series with ID: ${seriesId}`
            });
        }

        return res.status(200).json({
            message: `Seasons of series ${seriesId} retrieved successfully`,
            data: response.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}

// returns all episodes of a series
exports.findAllEpisodesBySeriesId = async (req, res) => {
    const seriesId = req.params.id; 
    const BASE_URL = `https://api.tvmaze.com/shows/${seriesId}/episodes`;

    try {
        const response = await axios.get(BASE_URL);

        if (!response || !response.data || response.data.length === 0) {
            return res.status(404).json({
                message: `No seasons found for series with ID: ${seriesId}`
            });
        }

        return res.status(200).json({
            message: `Episodes of series ${seriesId} retrieved successfully`,
            data: response.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}

// returns episode by number
exports.findEpisodeByNumber = async (req, res) => {
    const seriesId = req.params.id; 
    const { season, number } = req.query;

    if (!season || !number) {
        return res.status(400).json({
            message: 'Both season and number are required.'
        });
    }

    const BASE_URL = `https://api.tvmaze.com/shows/${seriesId}/episodes`;

    try {
        const response = await axios.get(BASE_URL);

        const episode = response.data.find(ep => ep.season === parseInt(season) && ep.number === parseInt(number));

        if (!episode) {
            return res.status(404).json({
                message: `Episode not found for season ${season}, episode ${number} in series ${seriesId}`
            });
        }

        return res.status(200).json({
            message: `Episode found for season ${season}, episode ${number}`,
            data: episode
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}

// returns cast by series id
exports.findAllCastBySeriesId = async (req, res) => {
    const seriesId = req.params.id; 
    const BASE_URL = `https://api.tvmaze.com/shows/${seriesId}/cast`;

    try {
        const response = await axios.get(BASE_URL);

        if (!response || !response.data || response.data.length === 0) {
            return res.status(404).json({
                message: `No cast found for the show with ID: ${seriesId}`
            });
        }

        return res.status(200).json({
            message: `Cast of the show with ID ${seriesId} retrieved successfully`,
            data: response.data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}

// returns all images of a series
exports.findAllImagesBySeriesId = async (req, res) => {
    const seriesId = req.params.id; 
    const BASE_URL = `https://api.tvmaze.com/shows/${seriesId}/images`;

    try {
        const response = await axios.get(BASE_URL);

        if (!response || !response.data || response.data.length === 0) {
            return res.status(404).json({
                message: `No images found for the show with ID: ${seriesId}`
            });
        }

        return res.status(200).json({
            message: `Images of the show with ID ${seriesId} retrieved successfully`,
            data: response.data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later.'
        })
    }
}