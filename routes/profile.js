const express = require('express');
const { checkConnected } = require('../config/middlewares');
const router = express.Router();
const Tutorial = require('../models/Tutorial')
const User = require('../models/User')

/************************************
 * PROFILE PAGE
 ************************************/
// GET '/profile'
// TODO: protect the route
router.get('/', checkConnected, (req, res, next) => {
  Tutorial.find({ _creator: req.user._id }).sort({ "created_at": -1 }).limit(3)
    .then(allCreated => {
      console.log(allCreated)
      res.render('profile/index', { allCreated, user: req.user })
    })
    .catch(err => {
      console.log("something went wrong when creating profile allCreated");
      next(err);
    });
})




module.exports = router;
