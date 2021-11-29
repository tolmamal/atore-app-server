module.exports = app => {
    const product = require("../controllers/product.controller.js");

    const router = require("express").Router();

    // Create a new Product
    router.post("/", product.create);

    app.use('/api/product', router);
};
