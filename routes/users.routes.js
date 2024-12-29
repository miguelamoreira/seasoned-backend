const express = require("express");
const router = express.Router();
require("dotenv").config();

// cloudinary
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// import controller middleware
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

router.route("/login")
  .post(usersController.login);

router.route("/:id")
  .get(usersController.findOne)
  .patch(usersController.patch)
  .delete(usersController.delete);

router.route("/:id/following")
  .get(usersController.followingGet)
  .post(usersController.followingPost)
  .delete(usersController.followingDelete);

router.route("/:id/followers")
  .get(usersController.followersGet);

router.route("/:id/preferedGenres")
  .get(usersController.preferedGenresGet)
  .post(usersController.preferedGenresPost)
  .delete(usersController.preferedGenresDelete);

router.route("/:id/viewingHistory")
  .get(usersController.viewingHistoryGet)
  .post(usersController.viewingHistoryPost)

router.route("/:id/followedSeries")
  .get(usersController.followedSeriesGet)
  .post(usersController.followedSeriesPost)
  .delete(usersController.followedSeriesDelete)

router.route("/:id/watchlist")
  .get(usersController.watchlistGet)
  .post(usersController.watchlistPost)
  .delete(usersController.watchlistDelete);

router.route("/:id/friendships")
  .get(usersController.friendshipsGet)

router.route("/:id/earnedBadges")
  .get(usersController.earnedBadgesGet)
  .post(usersController.earnedBadgesPost)

router.route("/:id/seasonProgress")
  .get(usersController.seasonProgressGet)
  .post(usersController.seasonProgressPost)
  .put(usersController.seasonProgressPut)

module.exports = router;
