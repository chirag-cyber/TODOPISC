
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'todo-app'
  });
module.exports = db;
