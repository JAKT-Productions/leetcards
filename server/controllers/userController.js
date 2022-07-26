const db = require('../models/appModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {

    const {username, password, email} = req.body;

    if (!username || !password) {
        return res.send(200).json({status: "error", errorMsg: "Username or Password is missing"});
    }

    try {
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
        return res.send(200).json({status: "error", errorMsg: "Username or Password is missing"});
    }

    try {
        const queryObj = {
            text: "SELECT user_id, username, password FROM users WHERE username=$1",
            values: [username]
        };

        let data = await db.query(queryObj);
        let storedPassword = data.password;
        let isVerified = await bcrypt.compare(password, storedPassword);

        if (isVerified) {
            res.locals.response = {status: "success", id: data.rows[0].user_id}
        } else {
            return res.send(200).json({status: "error", errorMsg: "Password not matching!"});
        }
        next();
    }
    catch(err) {
        next({
            log: 'Express error handler caught error in userController.verifyUser',
            message: { err: 'An error occurred in verifying user in database' }, 
        });
    }
};