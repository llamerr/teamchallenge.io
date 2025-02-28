import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { bigint, boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

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
  projectId: integer('project_id').references(() => projectsTable.id),
});

export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
});

export const artifactCategoriesTable = pgTable('artifact_categories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 50 }).unique(),
  name: varchar('name', { length: 100 }),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
});

export const artifactsTable = pgTable('artifacts', {
  id: serial('id').primaryKey(),
  rootArtifactId: integer('root_artifact_id').references((): AnyPgColumn => artifactsTable.id),
  parentVersionId: integer('parent_version_id').references((): AnyPgColumn => artifactsTable.id),

  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  categoryId: integer('category_id').references(() => artifactCategoriesTable.id),

  authorId: integer('author_id').references(() => usersTable.id),
  fileSize: bigint('file_size', { mode: 'number' }),
  filePath: varchar('file_path', { length: 500 }),

  dateCreated: timestamp('date_created').defaultNow(),
  lastUpdated: timestamp('last_updated').defaultNow(),

  downloads: integer('downloads').default(0),
  views: integer('views').default(0),

  license: varchar('license', { length: 50 }),

  versionNumber: varchar('version_number', { length: 50 }).notNull(),
  versionType: varchar('version_type', { length: 20 }), // 'original', 'fork', 'update', 'collaborative'

  isCurrent: boolean('is_current').default(false),

  status: varchar('status', { length: 20 }), // 'draft', 'published', 'archived'
});

export const artifactVersionChangesTable = pgTable('artifact_version_changes', {
  id: serial('id').primaryKey(),
  artifactId: integer('artifact_id').references(() => artifactsTable.id),
  userId: integer('user_id').references(() => usersTable.id),

  changeType: varchar('change_type', { length: 50 }), // 'title', 'description', 'file'
  oldValue: text('old_value'),
  newValue: text('new_value'),

  changedAt: timestamp('changed_at').defaultNow(),
  changeDescription: text('change_description'),
});

export const newsTable = pgTable('news', {
  id: serial('id').primaryKey(),
});

export const notificationsTable = pgTable('notifications', {
  id: serial('id').primaryKey(),
  newsId: integer('news_id').references(() => newsTable.id),
});

export const userToTeamTable = pgTable('u_to_t', {
  userId: integer('user_id').references(() => usersTable.id),
  teamId: integer('team_id').references(() => teamsTable.id),
});

export const artifactToProjectTable = pgTable('a_to_p', {
  artifactId: integer('artifact_id').references(() => artifactsTable.id),
  projectId: integer('project_id').references(() => projectsTable.id),
  addedAt: timestamp('added_at').defaultNow(),
});

export const artifactToTeamTable = pgTable('a_to_t', {
  artifactId: integer('artifact_id').references(() => artifactsTable.id),
  teamId: integer('team_id').references(() => teamsTable.id),
  addedAt: timestamp('added_at').defaultNow(),
});

export const artifactTagsTable = pgTable('artifact_tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).unique(),
  description: text('description'),
});

export const artifactToTagTable = pgTable('a_to_tags', {
  artifactId: integer('artifact_id').references(() => artifactsTable.id),
  tagId: integer('tag_id').references(() => artifactTagsTable.id),
  addedAt: timestamp('added_at').defaultNow(),
});

export const notificationToUserTable = pgTable('n_to_u', {
  notificationId: integer('notification_id').references(() => notificationsTable.id),
  userId: integer('user_id').references(() => usersTable.id),
});
