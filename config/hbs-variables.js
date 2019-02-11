module.exports = app => {
  // Check if user is connected
  app.use((req, res, next) => {
    res.locals.isConnected = !!req.user;
    next();
  });

  // Check if user is admin
  app.use((req, res, next) => {
    res.locals.isAdmin = req.user && req.user.role === 'admin';
    next();
  });
};
