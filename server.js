require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require('axios');
const db = require("./models");

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json({ message: "home -- Seasoned api" });
});

app.use("/users", require("./routes/users.routes.js"));
app.use('/badges', require('./routes/badges.routes.js'));
app.use('/genres', require('./routes/genres.routes.js'));
app.use('/series', require('./routes/series.routes.js'));
app.use('/seasons', require('./routes/seasons.routes.js'));
app.use('/episodes', require('./routes/episodes.routes.js'));

app.listen(port, () => console.log(`App listening at http://${host}:${port}/`));
