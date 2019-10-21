const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

// POST /api/user/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { email, nick, password } = req.body;
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res
        .status(200)
        .json({ code: 200, message: '이전에 가입하신 메일이이에요!' });
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res
      .status(201)
      .json({ code: 201, message: '회원 가입에 성공하셨어요~' });
  } catch (error) {
    return next(error);
  }
});

// POST /api/user/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      res.status(401).json({ code: 401, message: info.message });
      return next(info.message);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        res.status(401).json({ code: 401, message: '다시 시도해주세요.' });
        return next(loginError);
      }
      const userInfo = await User.findOne({
        where: { id: user.id },
        attributes: ['id', 'email', 'nick'],
      });
      return res.status(200).json(userInfo);
    });
  })(req, res, next);
});

// POST /api/user/logout
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({
    code: 200,
    message: '다음에 또 봐요!',
  });
});

module.exports = router;
