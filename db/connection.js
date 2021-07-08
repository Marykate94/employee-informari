const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: '#Brooklyn1950',
  database: 'employee_database'
});

module.exports = db;