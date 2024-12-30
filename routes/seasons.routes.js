const express = require("express");
const router = express.Router();
require("dotenv").config();

const seasonsController = require('../controllers/seasons.controller')

router.route('/:id/episodes')
    .get(seasonsController.findAllEpisodesBySeasonId)

module.exports = router;