const express = require('express');
const Tutorial = require('../models/Tutorial');
const Like = require('../models/Like');
const { checkConnected } = require('../config/middlewares');
const router = express.Router();

/***************************************
 * Show all tutorials
 ***************************************/
// router.get('/all', checkConnected, (req, res, next) => {
//   let tutorials;

//   Tutorial.find()
//     .populate('_creator')
//     .then(tutorialDocs => {
//       tutorials = tutorialDocs;
//       return Like.find({ _user: req.user._id });
//     })
//     .then(likes => {
//       res.render('tutorial/all', { tutorials, likes });
//     })
//     .catch(err => {
//       console.log(err);
//       next(err);
//     });
// });

router.get('/all', checkConnected, (req, res, next) => {
  Promise.all([Tutorial.find().lean(), Like.find({ _user: req.user._id })])
    .then(([tutorials, likesFromConnectedUser]) => {
      res.render('tutorial/all', {
        tutorials: tutorials.map(tutorial => ({
          ...tutorial,
          isLiked: likesFromConnectedUser.some(like =>
            like._tutorial.equals(tutorial._id)
          )
        }))
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/***************************************
 * HTML & CSS
 ***************************************/
router.get('/html-css', (req, res, next) => {
  Tutorial.find({ category: 'html/css' })
    .then(htmlCss => {
      res.render('tutorial/html-css', { htmlCss });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/***************************************
 * Javascript
 ***************************************/
router.get('/javascript', (req, res, next) => {
  Tutorial.find({ category: 'javascript' })
    .then(javascript => {
      res.render('tutorial/javascript', { javascript });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/***************************************
 * React
 ***************************************/
router.get('/react', (req, res, next) => {
  Tutorial.find({ category: 'react' })
    .then(react => {
      res.render('tutorial/react', { react });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/***************************************
 * Nodejs
 ***************************************/
router.get('/nodejs', (req, res, next) => {
  Tutorial.find({ category: 'nodejs' })
    .then(nodejs => {
      res.render('tutorial/nodejs', { nodejs });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/***************************************
 * Express
 ***************************************/
router.get('/express', (req, res, next) => {
  Tutorial.find({ category: 'express' })
    .then(express => {
      res.render('tutorial/express', { express });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

/***************************************
 * Mongodb
 ***************************************/
router.get('/mongodb', (req, res, next) => {
  Tutorial.find({ category: 'mongodb' })
    .then(mongodb => {
      res.render('tutorial/mongodb', { mongodb });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
