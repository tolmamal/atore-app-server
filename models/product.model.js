const sql = require("../db.js");

// constructor
const Product = function (tutorial) {
    this.name = tutorial.name;
    this.price = tutorial.price;
};

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

module.exports = Product;
