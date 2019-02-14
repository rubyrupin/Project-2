const express = require('express');
const Tutorial = require('../models/Tutorial');
const Like = require('../models/Like');
const { checkConnected } = require('../config/middlewares');
const router = express.Router();

/***************************************
 * Better version
 ***************************************/

// The slug could be: 'all', 'html-css', 'react', ...
router.get('/:slug', checkConnected, (req, res, next) => {
  let { slug } = req.params
  let filter = {}

  switch (slug) {
    case 'all':
      break
    case 'html-css': 
      filter.category = 'html/css' 
      break
    default: 
      filter.category = slug 
  }

  Promise.all([
    Tutorial.find(filter)
      .sort({ created_at: -1 })
      .populate('_creator')
      .lean(),
    Like.find({ _user: req.user._id })
  ])

    .then(([tutorials, likesFromConnectedUser]) => {
      res.render('tutorial/'+slug, {
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
})

module.exports = router;
