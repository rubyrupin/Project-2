const express = require('express');
const Tutorial = require('../models/Tutorial');
const router = express.Router();

/***************************************
 * Show all tutorials
 ***************************************/
router.get('/all', (req, res, next) => {
	Tutorial.find()
		.populate('_userPost') // Test
		.then(tutorials => {
			res.render('tutorial/all', { tutorials });
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

/***************************************
 * HTML & CSS
 ***************************************/
router.get('/html-css', (req, res, next) => {
	Tutorial.find({ categories: 'html/css' })
		.then(htmlCss => {
			res.render('tutorial/html-css', { htmlCss });
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});


/***************************************
 * Javascript
 ***************************************/
router.get('/javascript', (req, res, next) => {
	Tutorial.find({ categories: 'javascript' })
		.then(javascript => {
			res.render('tutorial/javascript', { javascript });
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

/***************************************
 * React
 ***************************************/
router.get('/react', (req, res, next) => {
	Tutorial.find({ categories: 'react' })
		.then(react => {
			res.render('tutorial/react', { react });
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

/***************************************
 * Nodejs
 ***************************************/
router.get('/nodejs', (req, res, next) => {
	Tutorial.find({ categories: 'nodejs' })
		.then(nodejs => {
			res.render('tutorial/nodejs', { nodejs });
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});

/***************************************
 * Express
 ***************************************/
router.get('/express', (req, res, next) => {
	Tutorial.find({ categories: 'express' })
		.then(express => {
			res.render('tutorial/express', { express });
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});
/***************************************
 * Mongodb
 ***************************************/
router.get('/mongodb', (req, res, next) => {
	Tutorial.find({ categories: 'mongodb' })
		.then(mongodb => {
			res.render('tutorial/mongodb', { mongodb });
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
});



module.exports = router;
