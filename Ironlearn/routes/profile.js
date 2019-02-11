const express = require('express');
const router = express.Router();

/************************************
 * PROFILE PAGE
 ************************************/
// GET '/profile'
// TODO: find user id
router.get('/', (req, res, next) => {
  res.render('profile/index');
});

module.exports = router;
