const express = require('express');
const { checkConnected } = require('../config/middlewares');
const router = express.Router();
const Tutorial = require('../models/Tutorial')
const User = require('../models/User')
const Like = require('../models/Like')

/************************************
 * PROFILE PAGE
 ************************************/
// GET '/profile'
// ==> view profile, show 3 latest posts and likes
// router.get('/', checkConnected, (req, res, next) => {
//   Tutorial.find({ _creator: req.user._id }).sort({ "created_at": -1 }).limit(3)
//     .then(post => {
//       res.render('profile/index', { post, user: req.user })
//     })
//     .catch(err => {
//       console.log("opps, something went wrong");
//       next(err);
//     });
// })
// /************************************
//  * PROFILE PAGE Shows 3 likes
//  ************************************/
// router.get('/', checkConnected, (req, res, next) => {
//   Like.find({ _user: req.user._id }).sort({ "created_at": -1 }).limit(3)
//     .populate("_tutorial")
//     .then(likes => {
//       console.log(likes)
//       res.render('profile/index', { likes })
//     })
// })

router.get('/', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find({ _creator: req.user._id }).sort({ "created_at": -1 }).limit(3), 
    Like.find({ _user: req.user._id }).sort({ "created_at": -1 }).limit(3)
      .populate("_tutorial")
  ])
    .then(([posts, likes]) => {
      console.log(posts);
      console.log(likes);
      res.render('profile/index', {
        user: req.user,
        posts,
        likes
      })
    })
})






/************************************
 * See all posts (protected)
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
