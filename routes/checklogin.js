'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user').User;
const AuthError = require('../error/AuthError');
const HttpError = require('../error/HttpError');

let jsonParser = bodyParser.json();
//checking if the user login is avaliable (not stored in DB yet)
router.post('/checklogin', jsonParser, (req, res) => {
    User.checkLogin(req.body.login, (err, user) => {
        if (err){
            if (err instanceof AuthError){
                return next(new HttpError(403, err.message));
            } else {
                return next(err)
            }
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;