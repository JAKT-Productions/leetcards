const express = require('express');
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
    console.log('sign up successful');
    res.status(200).json(res.locals.id);
});

router.post('/login', userController.verifyUser, apiController.getDecks, (req, res) => {
    console.log('login successful');
    res.status(200).json(res.locals.getDecks);
});

module.exports = router;