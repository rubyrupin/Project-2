const mongoose = require('mongoose');
const User = require('../models/User');
const Tutorial = require('../models/Tutorial');
const Like = require('../models/Like');
const userData = require('./userData');
const tutorialData = require('./tutorialData');
const likeData = require('./likeData');

// Connect to mongodb ironlearn database
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

// Insert 'fake' data
Promise.all([User.deleteMany({}), Tutorial.deleteMany({}), Like.deleteMany({})])
  .then(() => {
    return Promise.all([
      User.create(userData),
      Tutorial.create(tutorialData),
      Like.create(likeData)
    ]);
  })
  .then(values => {
    console.log(`${values[0].length} users created.`);
    //console.log(`${values[1].length} tutorials created.`);
    //console.log(`${values[2].length} likes created.`);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

