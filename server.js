require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use('/users', require('./routes/users.routes.js'))

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`App listening at http://${host}:${port}/`));