const express = require('express');
const Tutorial = require('../models/Tutorial')
const router = express.Router();

// all
router.get('/all', (req, res, next) => {
	Tutorial.find()
		.then(tutorials => {
			res.render('tutorial/all', { tutorials })
		})
		.catch(err => next(err))

})

//html-css
router.get('/html-css', (req, res, next) => {
	Tutorial.find({ categories: 'html/css' })
		.then(htmlCss => {
			//render hbs page and give it the htmlCss data
			res.render('tutorial/html-css', { htmlCss })
		})
		.catch(err => next(err))
})


module.exports = router;
