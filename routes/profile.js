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




module.exports = router;
