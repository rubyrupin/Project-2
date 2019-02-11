const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

const users = [
  {
    username: 'John',
    password: bcrypt.hashSync('john', bcrypt.genSaltSync(bcryptSalt)),
    description: 'Beginner wed developer'
  },
  {
    username: 'Rebecca',
    password: bcrypt.hashSync('rebecca', bcrypt.genSaltSync(bcryptSalt)),
    description: 'Always happy wed dev master'
  },
  {
    username: 'Amelia',
    password: bcrypt.hashSync('amelia', bcrypt.genSaltSync(bcryptSalt)),
    description: 'I love my HippoLim'
  },
  {
    username: 'Ruby',
    password: bcrypt.hashSync('ruby', bcrypt.genSaltSync(bcryptSalt)),
    description: 'Happy little me!'
  },
  {
    username: 'Maxence',
    password: bcrypt.hashSync('maxence', bcrypt.genSaltSync(bcryptSalt)),
    description: 'Wow.. chu chu chu chu... Wow... I love carrot.. wow...',
    role: 'admin'
  }
];

module.exports = users;
