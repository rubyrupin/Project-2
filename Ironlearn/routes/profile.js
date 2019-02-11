const express = require('express');
const router = express.Router();

/************************************
 * PROFILE PAGE
 ************************************/
// GET '/profile'
// TODO: protect the route
router.get('/',  (req, res, next) => {

  res.render('profile/index', { user: req.user });
});

module.exports = router;
