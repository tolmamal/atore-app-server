const {body, query, validationResult} = require('express-validator');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const product = require("../controllers/product.controller.js");



const name = 'Tal'
const dir = 'Desktop'
const accessLogStream = fs.createWriteStream(path.join('/', 'users', name, dir ,'logs.txt'), { flags: 'a' });


// https://express-validator.github.io/docs/running-imperatively.html
const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({errors: errors.array()});
    };
};

module.exports = app => {
    const product = require("../controllers/product.controller.js");
    const router = require("express").Router();

    // Create a new Product
    router.post(
        '/',
        validate([
            body('name', 'INVALID_NAME_LENGTH').isLength({
                min: 2,
                max: 30
            }),
            body('name','INVALID_NAME_CHARS').isWhitelisted(
                ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),

            body('price').notEmpty(),
            body('price', 'INVALID_PRICE_VALUE').isNumeric()
        ]),
        product.create
    );

    // Retrieve all products
    router.get("/", product.getAll);


    router.get("/search",
        validate([
            query('searchQuery', 'INVALID_NAME_LENGTH').isLength({
                min: 2,
                max: 30
            }),
        query('searchQuery', 'INVALID_NAME_CHARS').isWhitelisted(
            ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),

    ]),
        product.search);


    app.use('/api/product',
        morgan(function (tokens, req, res) {
        return [
            tokens.req.httpVersion,
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), ' - ',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body),
            JSON.stringify(res.body),


        ].join(' ');
    } ,{ stream: accessLogStream }) ,router);
};
