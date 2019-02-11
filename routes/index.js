const express = require('express');
const { checkConnected } = require('../config/middlewares');

const router = express.Router();

/************************************
 * HOME PAGE
 ************************************/
// GET '/'
router.get('/', (req, res, next) => {
  res.render('index');
});

/************************************
 * Share Link (protected)
 ************************************/
// GET '/share'
// ==> render share post form
router.get('/share', checkConnected, (req, res, next) => {
  res.render('protected/share');
});

// POST '/share'
// ==> redirect to profile when success
router.post('/share', (req, res, next) => {
  
  console.log(req.body);
  res.redirect('/profile');
});

module.exports = router;
