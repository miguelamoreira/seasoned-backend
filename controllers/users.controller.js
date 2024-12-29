const db = require("../models/index.js");
const { ValidationError, Sequelize, where } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWTconfig } = require("../config/db.config.js");
require("dotenv").config();

//Declare DB's
const Users = db.Users;
const Following = db.Following;
const PreferredGenres = db.PreferredGenres;
const Genres = db.Genres;
const ViewingHistory = db.ViewingHistory;
const FollowedSeries= db.FollowedSeries;
const Watchlist = db.Watchlist;
const EarnedBadges= db.EarnedBadges;
const SeasonProgress = db.SeasonProgress;

// Functions
exports.findAll = async (req, res) => {
  let user = await Users.findAll();

  if (user) return res.json(user);

  return res.status(500).json({
    error: "Server Error, pls check the connection",
  });
};

exports.create = async (req, res) => {
  let user = await Users.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (user)
    return res.status(403).json({
      success: false,
      msg: "User is already in the database",
    });

  let userNew = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    registration_date: Date.now(),
  });

  return res.status(201).json("User created successfuly");
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body || !req.body.name || !req.body.password)
      return res.status(400).json({
        success: false,
        msg: "Failed! Must provide username and password.",
      });

    let user = await Users.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "User not found.",
      });

    const check = bcrypt.compareSync(req.body.password, user.password);

    if (!check)
      return res.status(401).json({
        success: false,
        msg: `Invalid Credentials`,
      });

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWTconfig.SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({
      loggedUserId: user.user_id,
      success: true,
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ValidationError)
      res.status(400).json({
        success: false,
        msg: err.errors.map((e) => e.message),
      });
    else
      res.status(500).json({
        success: false,
        msg: err.message || "Some error occurred while creating the user.",
      });
  }
};

exports.findOne = async (req, res) => {
  let User = await Users.findOne({
    where: {
      user_id: req.params.id,
    },
  });

  if (User.length != 0) return res.json(User);

  return res.status(400).json({
    error: "User not exists",
  });
};

exports.patch = async (req, res) => {
  try {
    let update = await Users.update(req.body,{
      where: {
        user_id: req.params.id,
      },
    })
  } catch (error) {
    return res.status(400).json({
      error: "User does not exist or input is not valid",
    });
  }
  
  return res.status(201).json("User updated succesully");
};

exports.delete = async (req, res) => {
  let User = await Users.findOne({
    where: {
      user_id: req.params.id,
    },
  });

  if (!User)
    return res.status(403).json({
      success: false,
      msg: "user does not exist",
    });
  let result = await Users.destroy({
    where: { user_id: req.params.id},
  });
  if (result == 1) {
    return res.status(200).json(`User was successfully deleted!`);
  }
};

exports.followingGet = async (req, res) => {
  let FollowingUsers = await Following.findAll({
    where: {
      user1_id: req.params.id,
    },
  });

  if (FollowingUsers) return res.json(FollowingUsers);

  return res.status(500).json({
    error: "Server Error, pls check the connection",
  });
};

exports.followingPost = async (req, res) => {
  let FollowingUser = await Following.findOne({
    where: {
      user1_id: req.params.id,
      user2_id: req.body.id,
    },
  });

  if (FollowingUser)
    return res.status(403).json({
      success: false,
      msg: "User is already followed",
    });

  let followingNew = await Following.create({
    user1_id: req.params.id,
    user2_id: req.body.id,
    Following_date: Date.now(),
  });

  return res.status(201).json("Following created successfuly");
};

exports.followingDelete = async (req, res) => {
  let FollowingUser = await Following.findOne({
    where: {
      user1_id: req.params.id,
      user2_id: req.body.id,
    },
  });

  if (!FollowingUser)
    return res.status(403).json({
      success: false,
      msg: "User is not following",
    });
  let result = await Following.destroy({
    where: { user1_id: req.params.id, user2_id: req.body.id },
  });
  if (result == 1) {
    return res.status(200).json(`Following was successfully deleted!`);
  }
};

exports.followersGet = async (req, res) => {
  let followersUsers = await Following.findAll({
    where: {
      user2_id: req.params.id,
    },
  });

  if (followersUsers) return res.json(followersUsers);

  return res.status(500).json({
    error: "Server Error, pls check the connection",
  });
};

exports.preferedGenresGet = async (req, res) => {
  let PreferredGenresUser = await PreferredGenres.findAll({
    where: {
      user_id: req.params.id,
    },
  });

  if (PreferredGenresUser) return res.json(PreferredGenresUser);

  return res.status(500).json({
    error: "Server Error, pls check the connection",
  });
};

exports.preferedGenresPost = async (req, res) => {
  let genreExists = await Genres.findOne({
    where: {
      genre_id: req.body.genre_id,
    },
  });
  if (!genreExists) {
    return res.status(403).json({
      success: false,
      msg: "Genre is invalid",
    });
  }

  let PreferredGenresUser = await PreferredGenres.findOne({
    where: {
      user_id: req.params.id,
      genre_id: req.body.genre_id,
    },
  });

  if (PreferredGenresUser)
    return res.status(403).json({
      success: false,
      msg: "Genre is already added",
    });

  let PreferredGenresNew = await PreferredGenres.create({
    user_id: req.params.id,
    genre_id: req.body.genre_id,
  });

  return res.status(201).json("Genre added successfuly");
};

exports.preferedGenresDelete = async (req, res) => {
  let preferedGenresUser = await PreferredGenres.findOne({
    where: {
      user_id: req.params.id,
      genre_id: req.body.genre_id,
    },
  });

  if (!preferedGenresUser)
    return res.status(403).json({
      success: false,
      msg: "Preferred Genre does not exist",
    });
  let result = await PreferredGenres.destroy({
    where: { user_id: req.params.id, genre_id: req.body.genre_id },
  });
  if (result == 1) {
    return res.status(200).json(`Preferred Genre was successfully deleted!`);
  }
};

exports.viewingHistoryGet = async (req, res) => {
  let ViewingHistoryUser = await ViewingHistory.findAll({
    where: {
      user_id: req.params.id,
    },
  });

  if (ViewingHistoryUser) return res.json(ViewingHistoryUser);

  return res.status(500).json({
    error: "Server Error, pls check the connection",
  });
};

exports.viewingHistoryPost = async (req, res) => {
  let ViewingHistoryUser = await ViewingHistory.findOne({
    where: {
      user_id: req.params.id,
      series_api_id: req.body.series_api_id,
      episode_api_id: req.body.episode_api_id,
      episode_progress: 100,
    },
  });
  if (ViewingHistoryUser)
    return res.status(403).json({
      success: false,
      msg: "Already watched the episode",
    });

  let ViewingHistoryStartedSerie = await ViewingHistory.findOne({
    where: {
      user_id: req.params.id,
      series_api_id: req.body.series_api_id,
      episode_api_id: req.body.episode_api_id,
    },
  });
  
  if (ViewingHistoryStartedSerie) {
    let update = await ViewingHistory.update(req.body, {
      where: {
        user_id: req.params.id,
        series_api_id: req.body.series_api_id,
        episode_api_id: req.body.episode_api_id,
      },
    });
    return res.status(201).json("History updated successfuly");
  } else {
    let New = await ViewingHistory.create({
      user_id: req.params.id,
      series_api_id: req.body.series_api_id,
      episode_api_id: req.body.episode_api_id,
      episode_progress: req.body.episode_progress,
      time_watched: req.body.time_watched,
    });
    return res.status(201).json("History added successfuly");
  }
};

exports.followedSeriesGet = async (req, res) => {
  let followedSeriesUser = await FollowedSeries.findAll({
    where: {
      user_id: req.params.id,
    },
  });

  if (followedSeriesUser) return res.json(followedSeriesUser);

  return res.status(500).json({
    error: "Server Error, pls check the connection",
  });
};

exports.followedSeriesPost = async (req, res) => {
  let followedSeriesUser = await FollowedSeries.findOne({
    where: {
      user_id: req.params.id,
      series_api_id: req.body.series_api_id,
    },
  });
  if (followedSeriesUser)
    return res.status(403).json({
      success: false,
      msg: "Already followed the series",
    });

  
    let New = await FollowedSeries.create({
      user_id: req.params.id,
      series_api_id: req.body.series_api_id,
    });
    return res.status(201).json("Series Followed successfuly");
  
};

exports.followedSeriesDelete = async (req, res) => {
  let followedSeriesUser = await FollowedSeries.findOne({
    where: {
      user_id: req.params.id,
      series_api_id: req.body.series_api_id,
    },
  });

  if (!followedSeriesUser)
    return res.status(403).json({
      success: false,
      msg: "You are not following the series",
    });
  let result = await FollowedSeries.destroy({
    where: { user_id: req.params.id, series_api_id: req.body.series_api_id },
  });
  if (result == 1) {
    return res.status(200).json(`Series succesfully Unfollowed`);
  }
};

exports.watchlistGet = async (req, res) => {
  let watchlistUsers = await Watchlist.findAll({
    where: {
      user_id: req.params.id,
    },
  });

  if (watchlistUsers) return res.json(watchlistUsers);

  return res.status(500).json({
    error: "Server Error, pls check the connection",
  });
};

exports.watchlistPost = async (req, res) => {
  let watchlistUser = await Watchlist.findOne({
    where: {
      user_id: req.params.id,
      series_api_id: req.body.series_api_id
    },
  });

  if (watchlistUser)
    return res.status(403).json({
      success: false,
      msg: "Series already in whatchlist",
    });

  let New = await Watchlist.create({
    user_id: req.params.id,
    series_api_id: req.body.series_api_id
  });

  return res.status(201).json("Series Added succesfully");
};

exports.watchlistDelete = async (req, res) => {
  let watchlistUser = await Watchlist.findOne({
    where: {
      user_id: req.params.id,
      series_api_id: req.body.series_api_id,
    },
  });

  if (!watchlistUser)
    return res.status(403).json({
      success: false,
      msg: "Series is not in the Watchlist",
    });
  let result = await Watchlist.destroy({
    where: { user_id: req.params.id,
      series_api_id: req.body.series_api_id, },
  });
  if (result == 1) {
    return res.status(200).json(`Series successfully removed from Watchlist`);
  }
};

exports.friendshipsGet = async (req, res) => {
  let FollowingUsers = await Following.findAll({
    where: {
      user1_id: req.params.id,
    },
  });
  let friendships= []
  for (let item = 0; item < FollowingUsers.length; item++) {
    console.log(FollowingUsers[item].user2_id);
    
    let FollowBack = await Following.findOne({
      where: {
        user1_id: FollowingUsers[item].user2_id,
        user2_id: req.params.id
      },
    });
    if(FollowBack){
      friendships.push(FollowingUsers[item])
    }
  }
  
  if (friendships.length != 0) return res.json(friendships);

  return res.status(400).json({
    error: "User has no friendships",
  });
};

exports.earnedBadgesGet = async (req, res) => {
  let EarnedBadgesUsers = await EarnedBadges.findAll({
    where: {
      user_id: req.params.id,
    },
  });

  if (EarnedBadgesUsers.length != 0) return res.json(EarnedBadgesUsers);

  return res.status(400).json({
    error: "There are no earned badges",
  });
};

exports.earnedBadgesPost = async (req, res) => {
  let EarnedBadgesUser = await EarnedBadges.findOne({
    where: {
      user_id: req.params.id,
      badge_id: req.body.badge_id
    },
  });

  if (EarnedBadgesUser)
    return res.status(403).json({
      success: false,
      msg: "Badges already earned",
    });

  let New = await EarnedBadges.create({
    user_id: req.params.id,
    badge_id: req.body.badge_id
  });

  return res.status(201).json("Badge earned successfully");
};


exports.seasonProgressGet = async (req, res) => {
  let SeasonProgressUsers = await SeasonProgress.findAll({
    where: {
      user_id: req.params.id,
    },
  });

  if (SeasonProgressUsers.length != 0) return res.json(SeasonProgressUsers);

  return res.status(400).json({
    error: "There are no earned badges",
  });
};

exports.seasonProgressPost = async (req, res) => {
  let SeasonProgressUser = await SeasonProgress.findOne({
    where: {
      user_id: req.params.id,
      season_id: req.body.season_id
    },
  });

  if (SeasonProgressUser)
    return res.status(403).json({
      success: false,
      msg: "Season progress already exists",
    });

  let New = await SeasonProgress.create({
    user_id: req.params.id,
    season_id: req.body.season_id,
    progress_percentage: req.body.progress_percentage
  });

  return res.status(201).json("Season Progress created successfully");
};

exports.seasonProgressPut = async (req, res) => {

  try {
    let update = await SeasonProgress.update(req.body,{
      where: {
        user_id: req.params.id,
        season_id: req.body.season_id
      },
    })
  } catch (error) {
    return res.status(400).json({
      error: "Season not started yet. Use Post instead",
    });
  }
  
  return res.status(201).json("Season Progress updated succesully");
};