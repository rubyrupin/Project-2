const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();
const bcryptSalt = 10;

/****************************************
 * Login Page
 *****************************************/
// GET '/auth/login' ==> login form
router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});

// POST '/auth/login'
// success ==> redirect to profile page
// fail ==> redirect to '/auth/login'
// TODO: find user id
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile', // FIXME:
    failureRedirect: '/auth/login',
    failureFlash: true,
    passReqToCallback: true
  })
);

/****************************************
 * Sign Up Page
 *****************************************/
// GET '/auth/signup' ==> sign up form
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

// POST '/auth/signup'
// success ==> redirect to profile page
// fail ==> redirect to '/auth/signup'
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const description = req.body.description;

  // Validation Fail
  if (username === '' || password === '') {
    res.render('auth/signup', { message: 'Indicate username and password' });
    return;
  }
  User.findOne({ username }, 'username', (err, user) => {
    if (user !== null) {
      res.render('auth/signup', { message: 'The username already exists' });
      return;
    }

    // Validation success
    //TODO: add description, automatically login
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = {
      username,
      password: hashPass,
      description
    };

    User.create(newUser)
      .then(userCreated => {
        console.log(userCreated);
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
        res.render('/auth/signup', {
          message: 'Sorry, something went wrong. Please try again later.'
        });
      });

    // const newUser = new User({
    //   username,
    //   password: hashPass
    // });

    // newUser
    //   .save()
    //   .then(() => {
    //     res.redirect('/profile');
    //   })
    //   .catch(err => {
    //     res.render('auth/signup', { message: 'Something went wrong' });
    //   });
  });
});

/****************************************
 * Logout
 *****************************************/
// GET '/logout'
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
