const express = require('express');
const { checkConnected } = require('../config/middlewares');

const router  = express.Router();


/************************************
 * HOME PAGE
************************************/
// GET '/'
router.get('/', (req, res, next) => {
  res.render('index');
});

/************************************
 * Share Link
************************************/
// GET '/share'
// ==> render share post form (protected)
router.get('/share', checkConnected, (req, res, next) => {
  res.render('/protected/share')
})


module.exports = router;
