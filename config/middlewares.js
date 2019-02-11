module.exports = {
  // check if user is connected
  checkConnected: function (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.render('auth/login');
    }
  }
}