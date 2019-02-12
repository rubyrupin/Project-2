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
 * Share Tutorial (protected)
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
  // req.body.categories.shift(); // remove the empty string (hidden trick) from categories array

  const { link, title, description, type, duration, category } = req.body;

  Tutorial.create({
    link,
    title,
    description,
    type,
    duration,
    category,
    _creator: req.user._id
  })
    .then(newTutorial => {
      res.render('protected/share-success');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/************************************
 * //TODO: delete this after testing
 ************************************/
// router.get('/share/success', (req, res, next) => {
//   res.render('protected/share-success');
// })

module.exports = router;
