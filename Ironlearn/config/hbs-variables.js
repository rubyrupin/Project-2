module.exports = app => {
	//check if user is connected
	app.use((req, res, next) => {
		res.locals.isConnected = !!req.user;
		next();
	});
	//check is user is admin
	app.use((req, res, next) => {
		res.locals.isAdmin = req.user && req.user.role === "admin";
		next()
	})
}