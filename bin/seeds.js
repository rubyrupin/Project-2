const mongoose = require('mongoose');
const User = require('../models/User');
const userData = require('./userData');

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

// Insert 'fake' user
User.deleteMany({})
  .then(() => {
    return User.create(userData);
  })
  .then(values => {
    console.log(`${values.length} users created.`);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
