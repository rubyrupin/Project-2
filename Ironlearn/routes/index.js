const express = require('express');
const router  = express.Router();

/************************************
 * HOME PAGE
************************************/
// GET '/'
router.get('/', (req, res, next) => {
  res.render('index');
});

//login/signup
router.get('/login', (req, res, next) => {
  res.render('')
})
module.exports = router;
