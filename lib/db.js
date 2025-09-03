import mysql from 'mysql2/promise';

let connection;

async function getConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port: process.env.DB_PORT || 3306,
        multipleStatements: true
      });
      
      await connection.query('CREATE DATABASE IF NOT EXISTS school_db');
      await connection.query('USE school_db');
      await connection.query(`
        CREATE TABLE IF NOT EXISTS schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(500) NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(100) NOT NULL,
          contact VARCHAR(10) NOT NULL,
          image VARCHAR(500),
          email_id VARCHAR(255) NOT NULL UNIQUE
        )
      `);
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
  return connection;
}

export default getConnection;