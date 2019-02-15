const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

const users = [
  {
    username: 'Amelia',
    password: bcrypt.hashSync('amelia', bcrypt.genSaltSync(bcryptSalt)),
    description:
      "Hello, I'm Amelia. I want to become a web developer! I'm trying my best to learn and code and become a better person. Please hire me!!!",
    imgUrl: '/images/profile-pic/profile15.svg'
  },
  {
    username: 'Ruby',
    password: bcrypt.hashSync('ruby', bcrypt.genSaltSync(bcryptSalt)),
    description: 'Happy little me!',
    imgUrl: '/images/profile-pic/profile24.svg'
  },
  {
    username: 'Maxence',
    password: bcrypt.hashSync('maxence', bcrypt.genSaltSync(bcryptSalt)),
    description:
      "Wow.. Let's see, chu chu chu chu (I'm typing now) Hmmmm, Yes, I know! Let's try this, chu chu chu.. Yeah, it works! Eeerr (missing the 'H' sound), you need to assign variable carrot to a number, wow... 42",
    imgUrl: '/images/profile-pic/profile0.svg',
    role: 'admin'
  }
];

module.exports = users;
