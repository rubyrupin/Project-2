const express = require('express');
const Like = require('../models/Like');
const { checkConnected } = require('../config/middlewares');
const { assignImg, assignColor } = require('../function/functions');

const router = express.Router();

// This route either add a like or remove it
// -> add if the logged in user hasn't liked yet the tutorial
// -> remove otherwise
router.post('/likes', checkConnected, (req, res, next) => {
  // TODO: first find
  // .create or .delete
  Like.create({
    _tutorial: req.body._tutorial,
    _user: req.user._id
  }).then(likeCreated => {
    res.json(likeCreated);
  });
});

module.exports = router;
