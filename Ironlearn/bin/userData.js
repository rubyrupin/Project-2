const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


const users = [
	{
		username: "John",
		password: bcrypt.hashSync("ruby", bcrypt.genSaltSync(bcryptSalt)),
		imgUrl: "",
		description: "beginner wed developer",

	},
	{
		username: "rebecca",
		password: bcrypt.hashSync("rebecca", bcrypt.genSaltSync(bcryptSalt)),
		imgUrl: "",
		description: "always happy wed dev master",
	}
]
