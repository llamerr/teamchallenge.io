import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { projectsToTechnologiesTable, usersToTechnologiesTable } from '../Schema';

// ------------------- Tables -------------------
export const technologiesTable = pgTable('technologies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).unique(),
  category: varchar('category', { length: 50 }),
});

// ------------------- Relations -------------------
export const technologiesRelations = relations(technologiesTable, ({ many }) => ({
  projects: many(projectsToTechnologiesTable),
  users: many(usersToTechnologiesTable),
}));
