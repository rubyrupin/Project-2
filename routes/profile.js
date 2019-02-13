const express = require('express');
const { checkConnected } = require('../config/middlewares');
const router = express.Router();
const Tutorial = require('../models/Tutorial')
const User = require('../models/User')

/************************************
 * PROFILE PAGE
 ************************************/
// GET '/profile'
// ==> view profile, show 3 latest post and likes
router.get('/', checkConnected, (req, res, next) => {
  Tutorial.find({ _creator: req.user._id }).sort({ "created_at": -1 }).limit(3)
    .then(post => {
      res.render('profile/index', { post, user: req.user })
    })
    .catch(err => {
      console.log("opps, something went wrong");
      next(err);
    });
})


/************************************
 * See all Tutorial (protected)
 ************************************/
// GET '/profile/allposts'
router.get('/allposts', checkConnected, (req, res, next) => {
  Tutorial.find({ _creator: req.user._id }).sort({ "created_at": -1 })
    .then(post => {
      if (post == null) {
        res.render('profile/allposts', { post, user: req.user })
      } else {

      res.render('profile/allposts', { post, user: req.user })
      }
    })
    .catch(err => {
      console.log("opps, something went wrong when showing all");
      next(err);
    });
})


/************************************
 * Delete Tutorial (protected)
 ************************************/
// GET '/delete/:tutorialId'
// ==> redirect to ALLPOSTS when succeed
router.get('/allposts/delete/:tutorialId', checkConnected, (req, res, next) => {
  Tutorial.findByIdAndDelete(req.params.tutorialId)
    .then(() => {
      res.redirect('/profile/allposts')
    })
    .catch(err => {
      console.log("Err happened when deleting at allposts ", err);
      next(err);
    })
})

module.exports = router;
