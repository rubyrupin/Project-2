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

  // Check active page
  app.use((req, res, next) => {
    if (req.url === '/') {
      res.locals.activeClass = { home: true };
    }
    if (req.url === '/profile') {
      res.locals.activeClass = { profile: true };
    }
    if (req.url === '/share') {
      res.locals.activeClass = { share: true };
    }
    if (req.url === '/tutorials/all') {
      res.locals.activeClass = { tutorials: true };
    }
    if (req.url === '/auth/login') {
      res.locals.activeClass = { login: true };
    }

    next();
  });
};
