const path = require('path');
const express = require('express');
const userRouter = require('./routes/userRouter');
const apiRouter = require('./routes/apiRouter');

const app = express();
const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
});

/* route request to router */
app.use('/api', apiRouter);
app.use('/user', userRouter);

// catch-all route handler for any requests to an unknown route
app.use('*', (req,res) => res.status(404).send('This is not the page you are looking for!'));

/**
 * Express Global error handler
 */
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  // start the server
  app.listen(PORT, () =>
  console.log(`Server listening on port: ${PORT}...`));

  module.exports = app;