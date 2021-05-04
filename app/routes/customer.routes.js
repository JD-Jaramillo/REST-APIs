module.exports = app => {
    const customers = require("../controllers/customer.controller");

    // create a new customer 
    app.post("/customers", customers.create);

    // retrieve all customers 
    app.get("/customers", customers.findAll);

    // Retrieve a single customer with a customerId 
    app.get("/customers/:customerId", customers.findOne);

    // Update a customer with CustomerId 
    app.put("/customers/:customerId", customers.update);

    // Delete a customer with customerID
    app.delete("/customers/:customerId", customers.delete);

    // Delete all the customers
    app.delete("/customers", customers.deleteAll);
};