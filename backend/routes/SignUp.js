const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/users');

const dishRouter = express.Router();

dishRouter.route('/').post((req, res, next) => {
    User.create(req.body)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
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

module.exports = dishRouter;