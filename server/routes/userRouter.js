const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
    console.log('sign up successful');
    res.status(200).json(res.locals.id);
});

router.post('/login', userController.verifyUser, (req, res) => {
    console.log('sign up successful');
    res.status(200).json(res.locals.response);
});

module.exports = router;