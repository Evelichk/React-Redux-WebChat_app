const HttpError = require('../error/HttpError');

module.exports = (req, res, next) => {
    if (!req.session.user){
        return res.redirect('/index.html');
    }
    console.log('auth: ' + req.session.user);
    next();
};