'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const User = require('../models/user').User;
const AuthError = require('../error/AuthError');
const HttpError = require('../error/HttpError');

router.post('/register', upload.none(), (req, res) => {
    User.register(req.body.login, req.body.email, req.body.password,(err, user) => {
        if(err){
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err)
            }
        }
        req.session.user = user.username;
        res.status(200).redirect('/webchat');
    });
});

module.exports = router;