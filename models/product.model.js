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

Product.search = (searchQuery, result) => {
    sql.query(`SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        // if (res.length) {
        //     console.log("found product: ", res[0]);
        //
        //     console.log("server - Product.get");
        //     console.log("res[0]: " + JSON.stringify(res[0]));
        //     console.log("res: " + JSON.stringify(res));
        //
        //
        //     return;
        // }
        // //product wasn't found in DB
        // result({ kind: "not_found" }, null);

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
