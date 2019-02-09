const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


const users = [
	{
		username: "John",
		password: bcrypt.hashSync("ruby", bcrypt.genSaltSync(bcryptSalt)),
		description: "beginner wed developer",

	},
	{
		username: "rebecca",
		password: bcrypt.hashSync("rebecca", bcrypt.genSaltSync(bcryptSalt)),
		description: "always happy wed dev master",
	},

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
