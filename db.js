const mysql = require('mysql2/promise');

// Create a pool of connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'qaxJew-9bepze-widmuv',
  database: 'company_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute a query
async function query(sql, params) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  query,
};
