const express = require("express");
const router = express.Router();
require("dotenv").config();

const seriesController = require('../controllers/series.controller')

router.route('/')
    .get(seriesController.findAllSeries)

router.route('/:id')
    .get(seriesController.findSeriesById)

router.route('/:id/seasons')
    .get(seriesController.findAllSeasonsBySeriesId)

router.route('/:id/episodes')
    .get(seriesController.findAllEpisodesBySeriesId)

router.route('/:id/episodebynumber')
    .get(seriesController.findEpisodeByNumber)

router.route('/:id/cast')
    .get(seriesController.findAllCastBySeriesId)

router.route('/:id/images')
    .get(seriesController.findAllImagesBySeriesId)

module.exports = router;