const express = require('express');
const { checkConnected } = require
  ('../config/middlewares');
const Tutorial = require('../models/Tutorial');
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
// ==> redirect to profile when success
router.post('/share', (req, res, next) => {
  req.body.categories.shift()
  console.log(req.body);
  const { link, title, description, categories, type, duration } = req.body
  Tutorial.create({
    link,
    title,
    description,
    categories,
    type,
    duration
  })
    .then(newPost => {
      console.log(newPost)
      res.redirect('/profile')
    })
})




module.exports = router;
