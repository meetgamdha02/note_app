const express = require('express');
const User = require('../models/users');
const bodyParsor = require('body-parser');
const  getToken  = require('../createToken');
const logInRouter = express.Router();
logInRouter.use(bodyParsor.json());
logInRouter.route('/').post((req, res, next) => {
    
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (user == null) {
                    var err = new Error('User ' + username + ' does not exist!');
                    err.status = 403;
                    return next(err);
                }
                else if (user.password != req.body.password) {
                    var err = new Error('Your password is incorrect!');
                    err.status = 403;
                    return next(err);
                }
                else if (req.body.username == user.username && req.body.password == user.password) {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json({
                        username : user.username,
                        token : getToken(user)
                    });
                }
            })
            .catch((err) => next(err));
        })

module.exports = logInRouter;