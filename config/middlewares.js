const Tutorial = require('../models/Tutorial');

module.exports = {
  // check if user is connected
  checkConnected: function (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  },

  // Check if the connected user is the creator of the tutorial
  checkCreatorOfTutorial: function (req, res, next) {
    if (!req.user) {
      res.redirect('/auth/login');
    }
    else {
      Tutorial.findById(req.params.tutorialId)
        .then(tutorial => {
          // If there is no tutorial or the _creator is not the connected user, then redirect to the home page
          if (!tutorial || !tutorial._creator.equals(req.user._id)) {
            res.redirect('/');
          }
          else {
            next();
          }
        })
        // The same as `.catch(next)`
        .catch(err => next(err))
    }

  },

  checkAdmin: function (req, res, next) {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.redirect('/')
    }
  }
}  