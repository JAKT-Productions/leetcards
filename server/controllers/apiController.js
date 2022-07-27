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

module.exports = apiController;
