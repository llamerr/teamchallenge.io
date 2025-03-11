import { relations } from 'drizzle-orm';
import { date, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { artifactsTable } from '../artifacts';
import { languagesTable } from '../languages';
import { projectsTable } from '../projects';
import { usersTable } from '../users';

// ------------------- Tables -------------------
export const teamsTable = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).unique(),
  projectId: integer('project_id').references(() => projectsTable.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  longDescription: text('long_description'),
  progress: integer('progress'),
  startDate: date('start_date'),
  status: varchar('status', { length: 50 }),
});

export const recentActivitiesTable = pgTable('recent_activities', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id').references(() => teamsTable.id),
  type: varchar('type', { length: 50 }),
  user: varchar('user', { length: 100 }),
  action: text('action'),
  date: timestamp('date'),
  details: text('details'),
});

// ------------------- Relations -------------------
export const teamsRelations = relations(teamsTable, ({ one, many }) => ({
  // one-to-many teams.project_id >- projects.id
  project: one(projectsTable, {
    fields: [teamsTable.projectId],
    references: [projectsTable.id],
  }),
  // many-to-one teams.id -< recent_activities.team_id
  recentActivities: many(recentActivitiesTable),
  // many-to-many teams.id >-< artifacts.id
  artifacts: many(artifactsTable),
  // many-to-many teams.id >-< users.id
  users: many(usersTable),
  // many-to-many teams.id >-< languages.id
  languages: many(languagesTable),
}));
export const recentActivitiesRelations = relations(recentActivitiesTable, ({ one }) => ({
  // one-to-many teams.id -< recent_activities.team_id
  team: one(teamsTable, {
    fields: [recentActivitiesTable.teamId],
    references: [teamsTable.id],
  }),
}));

// many-to-one teams.project_id >- projects.id

// many-to-many teams.id >-< artifacts.id
// ../artifacts/index.ts
// ../Schema.ts

// many-to-many teams.id >-< users.id
// ../users/index.ts
// ../Schema.ts

// many-to-many teams.id >-< languages.id
// ../languages/index.ts
// ../Schema.ts
