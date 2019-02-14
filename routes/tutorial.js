const express = require('express');
const Tutorial = require('../models/Tutorial');
const Like = require('../models/Like');
const { checkConnected } = require('../config/middlewares');
const router = express.Router();

/***************************************
 * Show all tutorials
 ***************************************/
// GET ('/tutorials/all')
router.get('/all', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find()
      .sort({ created_at: -1 })
      .populate('_creator')
      .lean(),
    Like.find({ _user: req.user._id })
  ])

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
router.get('/html-css', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find({ category: 'html/css' })
      .sort({ created_at: -1 })
      .populate('_creator')
      .lean(),
    Like.find({ _user: req.user._id })
  ])

    .then(([tutorials, likesFromConnectedUser]) => {
      res.render('tutorial/html-css', {
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
 * Javascript
 ***************************************/
router.get('/javascript', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find({ category: 'javascript' })
      .sort({ created_at: -1 })
      .populate('_creator')
      .lean(),
    Like.find({ _user: req.user._id })
  ])

    .then(([tutorials, likesFromConnectedUser]) => {
      res.render('tutorial/javascript', {
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
 * React
 ***************************************/
router.get('/react', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find({ category: 'react' })
      .sort({ created_at: -1 })
      .populate('_creator')
      .lean(),
    Like.find({ _user: req.user._id })
  ])

    .then(([tutorials, likesFromConnectedUser]) => {
      res.render('tutorial/react', {
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
 * Nodejs
 ***************************************/
router.get('/nodejs', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find({ category: 'nodejs' })
      .sort({ created_at: -1 })
      .populate('_creator')
      .lean(),
    Like.find({ _user: req.user._id })
  ])

    .then(([tutorials, likesFromConnectedUser]) => {
      res.render('tutorial/nodejs', {
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
 * Express
 ***************************************/
router.get('/express', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find({ category: 'express' })
      .sort({ created_at: -1 })
      .populate('_creator')
      .lean(),
    Like.find({ _user: req.user._id })
  ])

    .then(([tutorials, likesFromConnectedUser]) => {
      res.render('tutorial/express', {
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
 * Mongodb
 ***************************************/
router.get('/mongodb', checkConnected, (req, res, next) => {
  Promise.all([
    Tutorial.find({ category: 'mongodb' })
      .sort({ created_at: -1 })
      .populate('_creator')
      .lean(),
    Like.find({ _user: req.user._id })
  ])

    .then(([tutorials, likesFromConnectedUser]) => {
      res.render('tutorial/mongodb', {
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
module.exports = router;
