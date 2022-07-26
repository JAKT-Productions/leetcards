const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
    console.log('sign up successful');
    res.status(200).json(res.locals.response);
});

router.post('/login', (req, res) => {
    console.log('sign up successful');
    res.status(200).json(res.locals.response);
});

module.exports = router;