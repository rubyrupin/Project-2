const express = require('express');
const Tutorial = require('../models/Tutorial');
const { checkConnected } = require('../config/middlewares');
const { assignImg, assignColor } = require('../function/functions');

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
// ==> redirect to post sucess when success
router.post('/share', checkConnected, (req, res, next) => {
  const { link, title, description, type, duration, category } = req.body;

  const imgUrl = assignImg(category);
  const color = assignColor(category);

  Tutorial.create({
    imgUrl,
    color,
    link,
    title,
    description,
    type,
    duration,
    category,
    _creator: req.user._id
  })
    .then(newTutorial => {
      console.log('new tutorial created');
      console.log(newTutorial);
      res.render('protected/share-success');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/************************************
 * Edit Tutorial (protected)
 ************************************/
// GET '/edit/:tutorialId'
// ==> render edit form
router.get('/edit/:tutorialId', checkConnected, (req, res, next) => {
  Tutorial.findById(req.params.tutorialId)
    .then(tutorial => {
      res.render('protected/edit', {tutorial})
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
})




module.exports = router;
