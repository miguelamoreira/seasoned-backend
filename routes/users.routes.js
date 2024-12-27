const express = require("express");
const router = express.Router();
require("dotenv").config();

// import controller middleware
const usersController= require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

router.route("/")
  .get(usersController.findAll)
  .post(usersController.create)


router.route("/login")
  .post(usersController.login)


  //export this router
module.exports = router;
