require('dotenv').config();
const express = require('express');
const db = require('./models');

const port = process.env.PORT || 8080;

const app = express();
db.sequelize.sync();

app.get('/', (req, res) => {
  res.send('hello, Cafe and Conquer!');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
