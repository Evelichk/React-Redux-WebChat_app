'use strict';

const mongoose = require('../libs/mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const AuthError = require('../error/AuthError');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha512', this.salt).update('password').digest('hex')
};

userSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword
};

userSchema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(128).toString('base64');
        this.hashedPassword = this.encryptPassword(password)
    });

userSchema.statics.register = function(username, email, password, callback) {
    const User = this;

    User.findOne({email: email}, function (err, user) {
        if (err){
                callback(err)
        } else if (user) {
            callback(new AuthError('Duplicate email'));
        } else {
            let user = new User({username: username, email: email, password: password});
            user.save(function(err){
                if (err) {
                    callback(err)
                } else {
                    callback(null, user)
                }
            })
        }
    });
};

exports.User = mongoose.model('User', userSchema);