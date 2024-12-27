const db = require("../models/index.js");
const users = db.users;
const { ValidationError, Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWTconfig } = require("../config/db.config.js");
require("dotenv").config();

exports.findAll = async (req, res) => {
  let user = await users.findAll();

  if (user) return res.json(user);

  return res.status(500).json({
    error: "Server Error, pls check the connection",
  });
};

exports.create = async (req, res) => {

  let user = await users.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (user)
    return res.status(403).json({
      success: false,
      msg: "User is already in the database",
    });
    
  let userNew = await users.create({
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

    let user = await users.findOne({
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
      loggedUserId: user.id_user,
      success: true,
      accessToken: token,
    });
  } catch (err) {
    console.log(ValidationError);
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
