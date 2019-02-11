const express = require('express');
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


module.exports = router;
