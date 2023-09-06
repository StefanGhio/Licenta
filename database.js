var mysql = require('mysql2');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Voyo2000',
    database: 'licenta'
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = conn;