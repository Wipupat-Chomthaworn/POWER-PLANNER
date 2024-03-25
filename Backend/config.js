const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '172.19.0.2',
  user: 'root',
  password: 'root',
  database: 'power',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;