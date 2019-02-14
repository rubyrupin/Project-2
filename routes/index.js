const express = require('express');
const Tutorial = require('../models/Tutorial');
const { checkConnected, checkCreatorOfTutorial } = require('../config/middlewares');
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
    link,
    title,
    description,
    type,
    duration,
    category,
    imgUrl,
    color,
    _creator: req.user._id
  })
    .then(newTutorial => {
      console.log('new tutorial created');
      console.log(newTutorial);
      res.redirect('/protected/share-success');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});
router.get('/protected/share-success', checkConnected, (req, res, next) => {
  res.render('protected/share-success');
})

/************************************
 * Edit Tutorial (protected)
 ************************************/
// GET '/edit/:tutorialId'
// ==> render edit form
router.get('/edit/:tutorialId', checkCreatorOfTutorial, (req, res, next) => {
  Tutorial.findById(req.params.tutorialId)
    .then(tutorial => {
      res.render('protected/edit', { tutorial })
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
})

// POST '/edit/:tutorialId'
// ==> render edit success if succeed
router.post('/edit/:tutorialId', checkCreatorOfTutorial, (req, res, next) => {
  const { link, title, description, type, duration, category } = req.body;

  const imgUrl = assignImg(category);
  const color = assignColor(category);

  Tutorial.findByIdAndUpdate(req.params.tutorialId, {
    link,
    title,
    description,
    type,
    duration,
    category,
    imgUrl,
    color,
    _creator: req.user._id
  }, { new: true })
    .then(updatedTutorial => {
      console.log(updatedTutorial);
      res.render('protected/edit-success')
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
})

/************************************
 * Delete Tutorial (protected)
 ************************************/
// GET '/delete/:tutorialId'
// ==> redirect to profile when succeeded
router.get('/delete/:tutorialId', checkCreatorOfTutorial, (req, res, next) => {
  Tutorial.findByIdAndDelete(req.params.tutorialId)
    .then(() => {
      res.redirect('/profile')
    })
    .catch(err => {
      console.log("Err happened when deleting at allposts ", err);
      next(err);
    })
})

module.exports = router
