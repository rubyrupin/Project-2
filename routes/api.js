const express = require('express');
const Like = require('../models/Like');
const Tutorial = require('../models/Tutorial');
const { checkConnected } = require('../config/middlewares');

const router = express.Router();

/***************************************
 * Like or Unlike
 ***************************************/
// POST '/api/likes'
router.post('/likes', checkConnected, (req, res, next) => {
  let tutorialId = req.body._tutorial;

  let potentialLike = {
    _user: req.user._id,
    _tutorial: tutorialId
  };

  let likeStatus;

  // like
  Like.findOne(potentialLike)
    .then(like => {
      // like
      if (like == null) {
        console.log('create like');
        likeStatus = true;
        return Like.create(potentialLike);
      } else {
        likeStatus = false;
        console.log('delete like');
        return Like.findByIdAndDelete(like._id);
      }
    })
    .then(likeDocument => {
      // find tutorial
      console.log('1.', likeDocument);
      return Tutorial.findById(tutorialId);
    })
    .then(tutorial => {
      // update tutorial: 
      // nbOfLikes + 1 if likeStatus is true
      // otherwise nbOfLikes - 1
      likeStatus ? tutorial.nbOfLikes++ : tutorial.nbOfLikes--;
      return tutorial.save();
    })
    .then(updatedTutorial => {
      res.json(updatedTutorial);
      return;
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});


module.exports = router;
