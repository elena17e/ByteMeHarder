const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // MySQL host
    user: 'root', // MySQL username
    password: 'root', // MySQL password
    database: 'bytemeharder', // MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();