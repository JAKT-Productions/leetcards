const express = require('express');

const router = express.Router();

const apiController = require('../controllers/apiController');

// Getting all the data including user info, decks, cards, tags.
// router.post('/getDecks', apiController.getDecks, (req, res) => {
//   console.log('Data Requested');
//   res.status(200).json(res.locals.getDecks);
// });

router.post('/getCards', apiController.getCards, (req, res) => {
  console.log('Data Requested');
  res.status(200).json(res.locals.getCards);
});

router.post('/createDeck', (req, res) => {
  console.log('Deck is created!');
  res.status(200).json('hi');
});

router.post('/createCard', (req, res) => {
  console.log('Card is created!');
  res.status(200).json('hi');
});

// router.post('/deleteDeck', (req, res) => {
//     console.log('Deck is deleted');
//     res.status(200).json('hi');
// });

// router.post('/deleteCard', (req, res) => {
//     console.log('Card is deleted');
//     res.status(200).json('hi');
// });

module.exports = router;
