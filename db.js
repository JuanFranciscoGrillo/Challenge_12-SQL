// Import the MySQL package for database operations
const mysql = require('mysql2/promise');

// Create a connection pool for managing database connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'qaxJew-9bepze-widmuv',
  database: 'company_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute a database query
async function query(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows; // Return the results of the query
  } catch (error) {
    throw error; // Throw an error if there's a problem with the query
  }
}

// Export the query function to make it accessible to other parts of the application
module.exports = {
  query,
};
