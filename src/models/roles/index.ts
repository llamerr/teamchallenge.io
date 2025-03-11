import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { projectsToRolesTable } from '../Schema';

// ------------------- Tables -------------------
export const rolesTable = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).unique(),
  description: text('description'),
  typicalSkills: text('typical_skills').array(),
  defaultCount: integer('default_count').default(1),
});

// ------------------- Relations -------------------
export const rolesRelations = relations(rolesTable, ({ many }) => ({
  projects: many(projectsToRolesTable),
}));
