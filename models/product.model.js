const sql = require("../db.js");

// constructor
const Product = function (tutorial) {
    this.name = tutorial.name;
    this.price = tutorial.price;
};

//TODO: add request payload to log
Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created product: ", {id: res.insertId, ...newProduct});
        result(null, {id: res.insertId, ...newProduct});
    });
};

//TODO: if product not found - msg to user
Product.search = (searchQuery, result) => {
    const newQuery = 'SELECT * FROM products WHERE name = ' + sql.escape(searchQuery);

    sql.query(newQuery, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);


    });
};

Product.getAll = (_, result) => {
    let query = "SELECT * FROM products";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
};


module.exports = Product;
