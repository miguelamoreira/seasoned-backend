const express = require("express");
const router = express.Router();
require("dotenv").config();

const episodesController = require('../controllers/episodes.controller')

router.route('/:id')
    .get(episodesController.findEpisodeById)

module.exports = router;