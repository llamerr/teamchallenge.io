import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { teamsTable } from '../teams';
import { usersTable } from '../users';

// ------------------- Tables -------------------
export const languagesTable = pgTable('languages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  description: text('description'),
});
// ------------------- Relations -------------------
export const languagesRelations = relations(languagesTable, ({ many }) => ({
  teams: many(teamsTable),
  users: many(usersTable),
}));
