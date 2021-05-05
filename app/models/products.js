const sql = require("./db.js");

const Products = function (products) {
    this.description = products.description;
    this.price = products.price;
    this.quantity = products.quantity;
    this.stock = products.stock;
};

Products.create = (newProduct, result) => {
    sql.query("INSERT INTO Products SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created products: ", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Products.findById = (productId, result) => {
    sql.query(`SELECT * FROM Products WHERE id = ${productId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found Products:", res[0]);
            result(null, res[0]);
            return;
        }
        // Products with this id not found 
        result({ kind: "not_found" }, null);
    });
};

Products.getAll = result => {
    sql.query("SELECT * FROM Products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Products: ", res);
        result(null, res);
    });
};

Products.updateById = (id, Products, result) => {
    sql.query(
        "UPDATE Products SET description = ?, price = ?, quantity = ?, stock = ? WHERE id = ?",
        [Products.description, Products.price, Products.quantity, Products.stock, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated Product: ", { id: id, ...Products });
            result(null, { id: id, ...Products });
        }
    );
};

Products.remove = (id, result) => {
    sql.query("DELETE FROM Products WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Products with id: ", id);
        result(null, res);
    });
};

Products.removeAll = result => {
    sql.query("DELETE FROM Products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} Products`);
        result(null, res);
    });
};

module.exports = Products; 