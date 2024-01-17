const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

connection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connectie succesvol");
    }
});

module.exports = connection;