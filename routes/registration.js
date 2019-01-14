'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const User = require('../models/user').User;
const AuthError = require('../error/AuthError');
const HttpError = require('../error/HttpError');

router.post('/register', upload.none(), (req, res, next) => {
    User.register(req.body.login, req.body.email, req.body.password,(err, user) => {
        if(err){
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err)
            }
        }
        res.status(200).end();
        req.session.user = user.username;

    });
});

module.exports = router;