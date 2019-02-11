const express = require('express');
const Tutorial = require('../models/Tutorial');
const router = express.Router();

/***************************************
 * Show all tutorials
 ***************************************/
router.get('/all', (req, res, next) => {
  Tutorial.find()
    .populate('_userPost') // Test
    .then(tutorials => {
      res.render('tutorial/all', { tutorials });
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
  Tutorial.find({ categories: 'html/css' })
    .then(htmlCss => {
      res.render('tutorial/html-css', { htmlCss });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
