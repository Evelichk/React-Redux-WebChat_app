const express = require('express');
const router = express.Router();

//main application route middleware, sending index page where 404 will be handled if page not found
router.all('*', (req, res) => {
    res.sendFile(res.locals.dirname + '/public/index.html')
});

module.exports = router;