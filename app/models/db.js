const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// create a new connection to the database 
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// open the MySQL connection 
connection.connect(error => {
    if (error) throw error;
    console.log("succesfully connected to the database");
});

module.exports = connection; 