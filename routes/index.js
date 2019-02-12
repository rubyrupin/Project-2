const express = require('express');
const Tutorial = require('../models/Tutorial');
const { checkConnected } = require('../config/middlewares');

const router = express.Router();

/************************************
 * HOME PAGE
 ************************************/
// GET '/'
router.get('/', (req, res, next) => {
  res.render('index');
});

/************************************
 * Share Link (protected)
 ************************************/
// GET '/share'
// ==> render share post form
router.get('/share', checkConnected, (req, res, next) => {
  res.render('protected/share');
});

// POST '/share'
// ==> create new tutorial
// ==> redirect to profile when success
router.post('/share', (req, res, next) => {
  ifreq.body.categories
  req.body.categories.shift(); // remove the empty string (hidden trick) from categories array

  const { link, title, description, type, duration, categories } = req.body;

  Tutorial.create({
    link,
    title,
    description,
    type,
    duration,
    categories,
    _creator: req.user._id
  })
    .then(newTutorial => {
      res.redirect('/profile');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
