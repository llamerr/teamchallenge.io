import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

export const counterSchema = pgTable('counter', {
  id: serial('id').primaryKey(),
  count: integer('count').default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
});

export const teamsTable = pgTable('teams', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').references(() => projectsTable.id),
});

export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
});

export const artifactsTable = pgTable('artifacts', {
  id: serial('id').primaryKey(),
});

export const newsTable = pgTable('news', {
  id: serial('id').primaryKey(),
});

export const notificationsTable = pgTable('notifications', {
  id: serial('id').primaryKey(),
  newsId: serial('news_id').references(() => newsTable.id),
});

export const userToTeamTable = pgTable('u_to_t', {
  userId: serial('user_id').references(() => usersTable.id),
  teamId: serial('team_id').references(() => teamsTable.id),
});

export const artifactToProjectTable = pgTable('a_to_p', {
  artifactId: serial('artifact_id').references(() => artifactsTable.id),
  projectId: serial('project_id').references(() => projectsTable.id),
});

export const artifactToTeamTable = pgTable('a_to_t', {
  artifactId: serial('artifact_id').references(() => artifactsTable.id),
  teamId: serial('team_id').references(() => teamsTable.id),
});

export const notificationToUserTable = pgTable('n_to_u', {
  notificationId: serial('notification_id').references(() => notificationsTable.id),
  userId: serial('user_id').references(() => usersTable.id),
});
