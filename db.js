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

// Example query execution
async function getAllEmployees() {
  try {
    const [rows] = await pool.query('SELECT * FROM employee');
    console.log(rows);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the function to retrieve all employees
getAllEmployees();
