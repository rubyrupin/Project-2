/***************************************
 * Require packages or files
 ***************************************/
require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

/***************************************
 * Connect to MongoDB
 ***************************************/
mongoose
  .connect('mongodb://localhost/ironlearn', { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

/***************************************
 * Initialize Express Application
 ***************************************/
const app = express();

/***************************************
 * Middleware Setup
 ***************************************/
// 1. dev logger
app.use(logger('dev'));
// 2. body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 3. cookie parser
app.use(cookieParser());
// 4. sass-css
app.use(
  require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
  })
);
// 5. Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.locals.title = 'Express - Generated with IronGenerator';
// 6. Enable authentication
app.use(
  session({
    secret: 'irongenerator',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
// 7. flash, error message
app.use(flash());
// 8. passport session
require('./passport')(app);

// . Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

/***************************************
 * hbs helper function
 ***************************************/
hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
    throw new Error('Handlebars Helper ifUndefined needs 1 parameter');
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

module.exports = app;
