const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        console.log(email, password);
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: '가입 정보가 없어요!' });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: '비밀번호가 틀렸어요!' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
