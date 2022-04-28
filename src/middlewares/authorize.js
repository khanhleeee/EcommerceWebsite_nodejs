module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (!req.session.logined) {
            res.redirect('/login');
        }
        return next();
    }
}