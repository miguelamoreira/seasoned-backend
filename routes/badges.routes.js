const express = require("express");
const router = express.Router();
require("dotenv").config();

const badgesController = require('../controllers/badges.controller');

router.route('/')
    .get(badgesController.getFindAllBadges)

router.route('/:id')
    .get(badgesController.getBadgeById)

module.exports = router;