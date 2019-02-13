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

  Like.findOne(potentialLike)
    .then(like => {
      // like
      if (like == null) {
        console.log('create like');
        return Like.create(potentialLike);
      }
    })
    .then(likeCreated => {
      // find tutorial
      return Tutorial.findById(tutorialId);
    })
    .then(tutorial => {
      // update tutorial: nbOfLikes + 1
      tutorial.nbOfLikes++;
      return tutorial.save();
    })
    .then(updatedTutorial => {
      res.json(updatedTutorial);
    });
});

// else {
//   console.log('delete like');
//   return Like.findByIdAndDelete(like._id);
// }

// -> add if the logged in user hasn't liked yet the tutorial
// -> remove otherwise
// TODO: first find
// .create or .delete
/***************************************
 * Like or Unlike
 ***************************************/
// POST '/api/likes'
// router.post('/likes', checkConnected, (req, res, next) => {
//   Like.find({
//     $and: [{ _user: req.user._id }, { _tutorial: req.body._tutorial }]
//   }).then(likeOrNot => {
//     // if user hasnt like the tutorial yet
//     if (likeOrNot.length === 0) {
//       Promise.all([
//         Like.create({
//           _tutorial: req.body._tutorial,
//           _user: req.user._id
//         }),
//         Tutorial.findById(req.body._tutorial)
//       ])
//         .then((results) => {
//           const tutorial = results[1];
//           let nbOfLikes = tutorial.nbOfLikes + 1;
//           console.log(nbOfLikes);
//           res.json(results[1]);
//         })

//     }
//   });
// });
// Like.create({
//   _tutorial: req.body._tutorial,
//   _user: req.user._id
// }).then(likeCreated => {
//   res.json(likeCreated);
// });

// 1. find and check the Like model
// Like.find({
//   $and: [{ _user: req.user._id }, { _tutorial: req.body._tutorial }]
// })
// 2. if the user hasn't liked the tutorial yet
// => add user and tutorial id to Like collection
// => nbOfLike +1
// .then(result => {
//   if (result.length === 0) {
//     Like.create({
//       _user: req.user._id,
//       _tutorial: req.body._tutorial
//     })
//       .then(likeCreated => {
//         return Tutorial.findById(req.body._tutorial);
//       })
//       .then(tutorial => {
//         let like = tutorial.nbOfLikes + 1;

//         Tutorial.findOneAndUpdate(
//           { _id: req.body._tutorial },
//           { nbOfLikes: like},
//           {new: true}
//         )
//         .then(updatedTutorial => {
//           console.log(updatedTutorial);
//           res.json(updatedTutorial)
//         })
//         .catch(err => next(err));
//       })
//       .catch(err => next(err));
//   }
// })
// .catch(err => next(err));

module.exports = router;
