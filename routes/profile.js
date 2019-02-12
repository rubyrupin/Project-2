const express = require('express');
const { checkConnected } = require('../config/middlewares');
const router = express.Router();

/************************************
 * PROFILE PAGE
 ************************************/
// GET '/profile'
// TODO: protect the route
router.get('/', checkConnected, (req, res, next) => {
  res.render('profile/index', { user: req.user });
});



module.exports = router;
