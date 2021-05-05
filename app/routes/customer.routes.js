module.exports = app => {
    const customers = require("../controllers/customer.controller");
    const products = require("../controllers/products.controller");

    // create a new customer 
    app.post("/customers", customers.create);
    // create a new product
    app.post("/products", products.create);

    // retrieve all customers 
    app.get("/customers", customers.findAll);
    // retrieve all products
    app.get("/products", products.findAll);

    // Retrieve a single customer with a customerId 
    app.get("/customers/:customerId", customers.findOne);
    // Retrieve a single product with a productId 
    app.get("/products/:productId", products.findOne);

    // Update a customer with CustomerId 
    app.put("/customers/:customerId", customers.update);
    // Update a product with productId 
    app.put("/products/:productId", products.update);

    // Delete a customer with customerID
    app.delete("/customers/:customerId", customers.delete);
    // Delete a product with productID
    app.delete("/products/:productId", products.delete);

    // Delete all the customers
    app.delete("/customers", customers.deleteAll);
    // Delete all the products
    app.delete("/products", products.deleteAll);
};