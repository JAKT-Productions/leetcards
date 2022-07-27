const db = require('../models/appModel');

const apiController = {};

apiController.getDecks = async (req, res, next) => {
  // const { user_id } = req.body;
  const { user_id } = res.locals.response;

  try {
    const query = {
      text: 'SELECT * FROM decks WHERE user_id=$1',
      values: [user_id],
    };
    const data = await db.query(query);
    const allDecks = data.rows;
    const userDecks = {};
    allDecks.map((element) => {
      userDecks['user_id'] = element.user_id;
      userDecks[element.deck_name] = element.deck_id;
    });
    res.locals.getDecks = userDecks;
    return next();
  } catch (err) {
    next({
      log: 'Express error handler caught error in apiController.getDecks',
      message: { err: 'An error occurred in requesting decks' },
    });
  }
};

apiController.getCards = async (req, res, next) => {
  const { deck_id } = req.body;

  try {
    const query = {
      text: 'SELECT * FROM cards WHERE deck_id=$1',
      values: [deck_id],
    };
    const data = await db.query(query);
    res.locals.getCards = data.rows;
    return next();
  } catch (err) {
    next({
      log: 'Express error handler caught error in apiController.getDecks',
      message: { err: 'An error occurred in requesting decks' },
    });
  }
};

apiController.createDeck = async (req, res, next) => {
  const { deck_name, user_id } = req.body;

  try {
    const query = {
      text: 'INSERT INTO decks (deck_name, user_id) VALUES ($1, $2) RETURNING deck_name, deck_id',
      values: [deck_name, user_id]
    };

    const data = await db.query(query);
    console.log(data);
    res.locals.data = {
      [data.rows[0].deck_name]: data.rows[0].deck_id
    };
    return next();

  } catch {
    return next({
      log: 'Express error handler caught error in apiController.createDeck',
      message: { err: 'An error occurred in creating a deck' },
    });
  }
};


apiController.createCard = async (req, res, next) => {
  const { deck_id, question, answer, favorite, iscode, tags } = req.body;

  try {
    const query = {
      text: 'INSERT INTO cards (deck_id, question, answer, favorite, iscode, tags) VALUES ($1, $2, $3, $4, $5, $6) RETURNING card_id, question, answer, favorite, iscode, tags',
      values: [deck_id, question, answer, favorite, iscode, tags]
    };

    const data = await db.query(query);
    console.log(data);
    res.locals.data = data.rows[0];
    return next();

  } catch {
    return next({
      log: 'Express error handler caught error in apiController.createCard',
      message: { err: 'An error occurred in creating a card' },
    });
  }
};

module.exports = apiController;
