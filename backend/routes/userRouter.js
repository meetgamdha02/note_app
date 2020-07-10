const express = require('express');
const User = require('../models/users');
const bodyParsor = require('body-parser');
const getToken = require('../createToken');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = require('../utils');
const e = require('express');
const userRouter = express.Router();
userRouter.use(bodyParsor.json());
// userRouter.use(auth);

function auth(req, res, next) {
    // console.log(req.headers['Authorization']);
    // console.log(req.headers.Authorization);
    if (!req.headers['authorization']) {
        var err = new Error(`You are not authenticated`);
        err.status = 403;   
        return next(err);
    } else {
        var bearer = req.headers['authorization'].split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }
}
userRouter.route('/logIn').post((req, res, next) => {

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
                    user: {
                        username: user.username,
                        email: user.email
                    },
                    token: getToken(user)
                });
            }
        })
        .catch((err) => next(err));
});

userRouter.route('/signUp').post((req, res, next) => {
    User.create(req.body)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                user: {
                    username: user.username,
                    email: user.email
                },
                token: getToken(user)
            });
        }, err => next(err))
        .catch((err) => {
            next(err);
        })
})
    .get((req, res, next) => {
        User.find({}).
            then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


userRouter.route('/meet').get(auth, (req, res, next) => {
    jwt.verify(req.token, TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.statusCode = 403;
            throw err;
        } else {
            res.json(decoded);
        }
    }).catch((err) => next(err));
})
userRouter.route("/user/profile").put(auth, (req, res, next) => {
    // console.log(req.body, req.headers);
    jwt.verify(req.token, TOKEN_SECRET_KEY, (err, decode) => {
        if (err) res.sendStatus(403);
        else {
            req.user = decode.username;
        }
    })
    User.findOne({ username: req.user })
        .then((user) => {
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            // console.log(user)
            user.save()
                .then((user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        user: {
                            username: user.username,
                            email: user.email
                        },
                        token: getToken(user)
                    });
                }, err => {
                    next(err);
                },
                    err => {
                        next(err);
                    })
        }).catch((err) => {
            next(err);
        })
})


userRouter.route('/user/home').get(auth, (req, res, next) => {
    // console.log(req.token)
    jwt.verify(req.token, TOKEN_SECRET_KEY, (err, decode) => {
        if (err) {
            var err = new Error(`There are some errors`);
            next(err);
        }
        else {
            // console.log(decode.username);
            User.findOne({ username: decode.username }).then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(user.notes)
            }, err => {
                next(err);
            })
                .catch((err) => {
                    next(err);
                })
        }
    })
});

userRouter.route('/user/home').post(auth, (req, res, next) => {
    jwt.verify(req.token, TOKEN_SECRET_KEY, (err, decode) => {
        if (err) {
            var err = new Error(`There are some errors`);
            next(err);
        }
        else {
            // console.log(decode.username);
            User.findOne({ username: decode.username }).then((user) => {
                if (user != null) {
                    user.notes.push({
                        title: req.body.title,
                        description: req.body.description
                    });
                    user.save()
                        .then((user) => {
                            res.statusCode = 200;
                            res.setHeader('Content-type', 'application/json');
                            res.json(user.notes);
                        }, err => next(err));
                }
            }, err => next(err))
                .catch((err) => next(err));
        }
    })
});

userRouter.route('/user/home').delete(auth, (req, res, next) => {
    jwt.verify(req.token, TOKEN_SECRET_KEY, (err, decode) => {
        if (err) {
            var err = new Error(`There are some errors`);
            next(err);
        }
        else {
            User.findOne({ username: decode.username }).then((user) => {
                if (user != null) {
                    user.notes.id(req.body.id).remove();
                }
                user.save()
                    .then((user) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/jsosn');
                        res.json(user.notes);
                    }, err => next(err))
            })
                .catch((err) => next(err));
        }
    })
})




userRouter.route('/user/home/:id/edit').put(auth, (req, res, next) => {
    jwt.verify(req.token, TOKEN_SECRET_KEY, (err, decode) => {
        if (err) {
            var err = new Error(`There are some errors`);
        }
        else {
            User.findOne({ username: decode.username }).then((user) => {
                if (user != null) {
                    user.notes.id(req.params.id).title = req.body.title;
                    user.notes.id(req.params.id).description = req.body.description;
                }
                user.save()
                    .then((user) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(user.notes);
                    }, err => next(err));
            })
                .catch((err) => next(err));
        }
    })
})


userRouter.route('/user/home/comments').post(auth, (req, res, next) => {
    jwt.verify(req.token, TOKEN_SECRET_KEY, (err, decode) => {
        if (err) {
            var err = new Error(`There are some errros`)
        }
        else {
            User.findOne({ username: decode.username }).then((user) => {
                if (user != null) {
                    user.notes.push(req.body);
                }
                user.save()
                    .then((user) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(user.notes);
                    }, err => next(err));
            })
                .catch((err) => {
                    next(err);
                })
        }
    })
})
module.exports = userRouter;