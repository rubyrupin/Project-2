const mongoose = require("mongoose");
const User = require("../models/User");
const Tutorial = require("../models/Tutorial");
const Like = require("../models/Like")
const userData = require('./userData');
const tutorialData = require('./tutorialData');
const likeData = require('./likeData');



mongoose
  .connect('mongodb://localhost/ironlearn', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



Promise.all([User.deleteMany(), Tutorial.deleteMany(), Like.deleteMany()])
  .then(() => {
    return Promise.all([User.create(userData), Tutorial.create(tutorialData), Like.create(likeData)])
  })

  .then(values => {
    console.log(`${values[0].length} users created.`)
    console.log(values)
  })
  // })

  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })


// User.deleteMany()
// .then(() => {
//   return User.create(users)
// })
// .then(usersCreated => {
//   console.log(`${usersCreated.length} users created with the following id:`);
//   console.log(usersCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })