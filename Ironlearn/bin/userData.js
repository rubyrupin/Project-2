const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

const users = [
  {
    username: 'amelia',
    password: bcrypt.hashSync('amelia', bcrypt.genSaltSync(bcryptSalt)),
    description: 'I love my HippoLim'
  },
  {
    username: 'ruby',
    password: bcrypt.hashSync('ruby', bcrypt.genSaltSync(bcryptSalt)),
    description: 'Happy little me!'
  }
];

module.exports = users;
