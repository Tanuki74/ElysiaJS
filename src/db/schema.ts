import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';

// Define the notes table
export const notes = mysqlTable('notes', {
  id: int('id').primaryKey().autoincrement(),
  content: varchar('content', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Define types for TypeScript
export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;
