const Products = require("../models/products");

// Create and save a new Product
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const Product = new Products({
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        stock: req.body.stock
    });

    Products.create(Product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Product"
            });
        else res.send(data);
    });
};

// Retrieve all Products from the database 
exports.findAll = (req, res) => {
    Products.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        else res.send(data);
    });
};

// Find a single Products with a productId 
exports.findOne = (req, res) => {
    Products.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Did not find Product with ${req.params.productId}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.productId
                });
            }
        } else res.send(data);
    });
};

// Update a Products identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Products.updateById(
        req.params.productId,
        new Products(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Did not find Products with id ${req.params.productId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Products with id " + req.params.productId
                    });
                }
            } else res.send(data);
        }
    );
}

// Delete a Products with the specified productId in the request 
exports.delete = (req, res) => {
    Products.remove(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Did not find Product with id ${req.params.productId}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + req.params.productId
                });
            }
        } else res.send({ message: `Product was deleted successfully!` });;
    });
};

// Delete all Products from the database 
exports.deleteAll = (req, res) => {
    Products.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all Products"
            });
        else res.send({ message: `All Products were deleted successfully!` });
    });
};

