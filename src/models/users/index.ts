import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { artifactsTable } from '../artifacts';
import { usersToLanguagesTable, usersToRolesTable, usersToTeamsTable, usersToTechnologiesTable } from '../Schema';

// ------------------- Tables -------------------
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const userProfilesTable = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => usersTable.id),
  title: varchar('title', { length: 255 }),
  avatar_url: varchar('avatar_url', { length: 500 }),
  location: varchar('location', { length: 255 }),
  about: text('about'),
  github_username: varchar('github_username', { length: 100 }),
  linkedin_username: varchar('linkedin_username', { length: 100 }),
  twitter_username: varchar('twitter_username', { length: 100 }),
  website_url: varchar('website_url', { length: 500 }),
  availability_status: varchar('availability_status', { length: 50 }),
  availability_date: timestamp('availability_date'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const userStatsTable = pgTable('user_stats', {
  user_id: integer('user_id').primaryKey().references(() => usersTable.id),
  projects_completed: integer('projects_completed').default(0),
  teams_led: integer('teams_led').default(0),
  artifacts_created: integer('artifacts_created').default(0),
  contributions: integer('contributions').default(0),
  rating: integer('rating').default(0),
});

export const projectStagesTable = pgTable('project_stages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  description: text('description'),
});

export const usersToStagesTable = pgTable('users_to_stages', {
  user_id: integer('user_id').references(() => usersTable.id),
  stage_id: integer('stage_id').references(() => projectStagesTable.id),
}, t => [primaryKey({ columns: [t.user_id, t.stage_id] })]);

// ------------------- Relations -------------------
export const usersRelations = relations(usersTable, ({ one, many }) => ({
  // one-to-one users.id -< user_profiles.user_id
  userProfile: one(userProfilesTable),
  // one-to-one users.id -< user_stats.user_id
  userStats: one(userStatsTable),
  // many-to-many users.id >-< project_stages.id
  projectStages: many(usersToStagesTable),
  // many-to-one artifacts.author_id >- users.id
  artifacts: many(artifactsTable),
  // many-to-many users.id >-< technologies.id
  technologies: many(usersToTechnologiesTable),
  // many-to-many users.id >-< languages.id
  languages: many(usersToLanguagesTable),
  // many-to-many users.id >-< roles.id
  roles: many(usersToRolesTable),
  // many-to-many users.id >-< teams.id
  teams: many(usersToTeamsTable),
}));

export const userProfilesRelations = relations(userProfilesTable, ({ one }) => ({
  // one-to-one user_profiles.user_id >- users.id
  user: one(usersTable, {
    fields: [userProfilesTable.user_id],
    references: [usersTable.id],
  }),
}));

export const userStatsRelations = relations(userStatsTable, ({ one }) => ({
  // one-to-one user_stats.user_id >- users.id
  user: one(usersTable, {
    fields: [userStatsTable.user_id],
    references: [usersTable.id],
  }),
}));

export const projectStagesRelations = relations(projectStagesTable, ({ many }) => ({
  // many-to-many project_stages.id >-< users_to_stages.id
  users: many(usersToStagesTable),
}));

export const usersToStagesRelations = relations(usersToStagesTable, ({ one }) => ({
  // one-to-one users_to_stages.user_id >- users.id
  user: one(usersTable, {
    fields: [usersToStagesTable.user_id],
    references: [usersTable.id],
  }),
  // one-to-one users_to_stages.stage_id >- project_stages.id
  stage: one(projectStagesTable, {
    fields: [usersToStagesTable.stage_id],
    references: [projectStagesTable.id],
  }),
}));
