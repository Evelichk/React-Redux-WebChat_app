const express = require('express');
const router = express.Router();

router.get('/username', (req, res) => {
    res.status(200).json({type: 'userName', username: req.session.user})
});

module.exports = router;