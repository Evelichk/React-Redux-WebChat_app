const authorize = require('../middleware/authorize');
const express = require('express');
const router = express.Router();

//simple middleware for checking if the user is authorized to visit webchat page
router.get('/webchat', authorize, (req, res, next) => {
    res.status(200).sendFile(res.locals.dirname + '/public/index.html');
});

module.exports = router;