require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./models');

const port = process.env.PORT || 8080;

const app = express();
db.sequelize.sync();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.get('/', (req, res) => {
  res.send('hello, Cafe and Conquer!');
});

app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    errorMessage: 'Not Found.',
  });
});

app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({
    code: 500,
    errorMessage: 'Server Error',
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
