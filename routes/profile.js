const express = require('express');
const { checkConnected } = require('../config/middlewares');
const router = express.Router();
const User = require('../models/User');
const Tutorial = require('../models/Tutorial');
const Like = require('../models/Like');

/************************************
 * PROFILE PAGE
 ************************************/
// GET '/profile'
// ==> view profile, show 3 latest posts and likes
router.get('/', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find({ _creator: req.user._id })
      .sort({ created_at: -1 })
      .limit(3)
      .lean(),
    Like.find({ _user: req.user._id })
      .sort({ created_at: -1 })
      .limit(3)
      .populate('_tutorial')
      .populate('_tutorial._creator')
      .lean()
  ])
    .then(([posts, likes]) => {
      console.log(likes);
      res.render('profile/index', {
        user: req.user,
        posts,
        likes
      });
    })

    // .then(([posts, allLikesFromConnectedUser]) => {
    //   let likes = [];

    //   allLikesFromConnectedUser.forEach(tutorial => {
    //     Tutorial.findById(tutorial._tutorial._id)
    //       .populate('_creator')
    //       .then(likedTutorial => {
    //         likes.push(likedTutorial);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         next(err);
    //       });
    //   });

    //   console.log(likes);

    //   if (posts.length == 0 && likes.length != 0) {
    //     res.render('profile/index', {
    //       user: req.user,
    //       noPostMessage: 'No posts yet',
    //       likes
    //     });
    //   } else if (likes.length == 0 && posts.length != 0) {
    //     res.render('profile/index', {
    //       user: req.user,
    //       noLikeMessage: 'No likes yet',
    //       posts
    //     });
    //   } else if (likes.length == 0 && posts.length == 0) {
    //     console.log('here');
    //     res.render('profile/index', {
    //       user: req.user,
    //       noLikeMessage: 'No likes yet',
    //       noPostMessage: 'No posts yet'
    //     });
    //   } else {
    //     res.render('profile/index', {
    //       user: req.user,
    //       posts,
    //       likes
    //     });
    //   }
    // })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/************************************
 * See all posts
 ************************************/
// GET '/profile/allposts'
router.get('/allposts', checkConnected, (req, res, next) => {
  Tutorial.find({ _creator: req.user._id })
    .sort({ created_at: -1 })
    .then(post => {
      res.render('profile/allposts', { post, user: req.user });
    })
    .catch(err => {
      console.log('opps, something went wrong when showing all');
      next(err);
    });
});

/************************************
 * Delete Tutorial from allposts
 ************************************/
// GET '/delete/:tutorialId'
// ==> redirect to ALLPOSTS when succeed
router.get('/allposts/delete/:tutorialId', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.findByIdAndDelete(req.params.tutorialId),
    Like.deleteMany({ _tutorial: req.params.tutorialId })
  ])
    .then(() => {
      res.redirect('/profile/allposts');
    })
    .catch(err => {
      console.log('Err happened when deleting at allposts ', err);
      next(err);
    });
});

/************************************
 * See all likes (protected)
 ************************************/
// GET '/profile/alllikes'
router.get('/alllikes', checkConnected, (req, res, next) => {
  Like.find({ _user: req.user._id })
    .sort({ created_at: -1 })
    .populate('_tutorial')
    .then(allLikesFromConnectedUser => {
      let allLikes = [];
      allLikesFromConnectedUser.forEach(tutorial => {
        Tutorial.findById(tutorial._tutorial._id)
          .populate('_creator')
          .then(likedTutorial => {
            console.log(likedTutorial);
            allLikes.push(likedTutorial);
          })
          .catch(err => {
            console.log(err);
            next(err);
          });
      });
      res.render('profile/alllikes', { user: req.user, allLikes });
    })
    .catch(err => {
      console.log('opps, something went wrong when showing all likes');
      next(err);
    });
});

/************************************
 * See other user's profile
 ************************************/
router.get('/:username', checkConnected, (req, res, next) => {
  let otherUser;

  User.findOne({ username: req.params.username }).then(user => {
    otherUser = user;

    Promise.all([
      Tutorial.find({ _creator: user._id })
        .sort({ created_at: -1 })
        .limit(3)
        .lean(),
      Like.find({ _user: user._id })
        .sort({ created_at: -1 })
        .limit(3)
        .populate('_tutorial')
    ]).then(([posts, likes]) => {
      console.log('likes', likes);

      if (posts.length == 0 && likes.length != 0) {
        res.render('profile/others', {
          otherUser,
          noPostMessage: 'No posts yet',
          likes
        });
      } else if (likes.length == 0 && posts.length != 0) {
        res.render('profile/others', {
          otherUser,
          noLikeMessage: 'No likes yet',
          posts
        });
      } else if (likes.length == 0 && posts.length == 0) {
        console.log('here');
        res.render('profile/others', {
          otherUser,
          noLikeMessage: 'No likes yet',
          noPostMessage: 'No posts yet'
        });
      } else {
        res.render('profile/others', {
          otherUser,
          posts,
          likes
        });
      }
    });
  });
});

module.exports = router;
