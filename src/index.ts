import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

// Import database connection
import { db, pool } from "./db";
import { note } from "./note";

// Initialize the app
const app = new Elysia()
      .use(swagger())
      .use(note)
      .listen(3000);

// Log database connection status
pool.query('SELECT 1')
  .then(() => {
    console.log('✅ MySQL database connection established successfully');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MySQL database:', err);
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
