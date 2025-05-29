import { pool } from './index';
import fs from 'fs';
import path from 'path';

async function migrate() {
  try {
    console.log('Starting database migration...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'migrations.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split SQL statements by semicolon
    const statements = sql
      .split(';')
      .filter(statement => statement.trim() !== '');
    
    // Execute each statement
    for (const statement of statements) {
      await pool.query(statement);
      console.log('Executed:', statement.substring(0, 50) + '...');
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close the connection pool
    await pool.end();
  }
}

// Run the migration
migrate();
