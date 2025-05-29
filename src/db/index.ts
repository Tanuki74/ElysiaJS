import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Create the connection pool
const poolConnection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'elysiajs',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create the Drizzle client
export const db = drizzle(poolConnection);

// Export the connection for potential direct use
export const pool = poolConnection;
