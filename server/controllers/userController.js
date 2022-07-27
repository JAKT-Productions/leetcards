const db = require('../models/appModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {

    const {username, password, email} = req.body;

    if (!username || !password) {
        return res.send(200).json({status: "error", errorMsg: "Username or Password is missing"});
    }

    try {
        const validateDuplicate = {
            text: "SELECT user_id, username FROM users WHERE username=$1",
            values: [username]
        };

        const validatingData = await db.query(validateDuplicate);
        if (validatingData.rows.length > 0) return res.status(200).json({status: "error", errorMsg: "Username already exist..."});

        const workFactor = 10;
        const encryptedpass = await bcrypt.hash(password, workFactor);
        const queryObj = {
            text: "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING user_id",
            values: [username, encryptedpass, email]
        };

        const data = await db.query(queryObj);
        res.locals.id = data.rows[0].user_id;
        next();
    }
    catch(err) {
        next({
            log: 'Express error handler caught error in userController.createUser',
            message: { err: 'An error occurred in creating user in database' }, 
        });
    }
};



userController.verifyUser = async (req, res, next) => {

    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(200).json({status: "error", errorMsg: "Username or Password is missing"});
    }

    try {
        const queryObj = {
            text: "SELECT user_id, username, password FROM users WHERE username=$1",
            values: [username]
        };

        const data = await db.query(queryObj);

        if (!data.length) return res.status(200).json({status: "error", errorMsg: "Username not found!"});

        const storedPassword = data.rows[0].password;
        const isVerified = await bcrypt.compare(password, storedPassword);

        if (isVerified) {
            res.locals.response = {status: "success", user_id: data.rows[0].user_id, username: data.rows[0].username}
        } else {
            return res.status(200).json({status: "error", errorMsg: "Password not matching!"});
        }
        return next();
    }
    catch(err) {
        return next({
            log: 'Express error handler caught error in userController.verifyUser',
            message: { err: 'An error occurred in verifying user in database' }, 
        });
    }
};

module.exports = userController;