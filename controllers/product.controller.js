const Product = require("../models/product.model.js");


// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });


    // Save Product in the database
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        else res.send(data);
    });
};

exports.search = (req, res) => {
    Product.search(req.query.searchQuery, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found product with name ${req.params.name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving product with name: " + req.params.name
                });
            }

        } else {
            res.send(data);
        }
    });
};

// Retrieve all products from the DB (with condition)

exports.getAll = (req, res) => {
    Product.getAll(null, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        } else res.send(data);
    });
};

