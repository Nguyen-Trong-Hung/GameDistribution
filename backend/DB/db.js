import mysql from 'mysql';
// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',  // Replace with your MySQL password
  database: 'InternProject',        // Replace with your database name
});

// Test MySQL connection when the server starts
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

export default db;
