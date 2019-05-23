
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const PassportLocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const config = require('./../../config');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({ where: { email: email.trim() } })
    .then((user) => {
      bcrypt.compare(password, user.password, (err, matched) => {
        if (err) return done(err);

        if (!matched) {
          const error = new Error('Incorrect email or password.');
          error.name = 'IncorrectCredentialsError';

          return done(error);
        }

        const payload = {
          sub: user.id,
        };

        const token = jwt.sign(payload, config.jwtSecret);
        const data = {
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
        };

        return done(null, token, data);
      });
    })
    .catch(err => done(err));
});
