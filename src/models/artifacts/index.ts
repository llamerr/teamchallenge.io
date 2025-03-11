import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { bigint, boolean, integer, pgTable, primaryKey, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { artifactsToProjectsTable, usersTable } from '../Schema';

// ------------------- Tables -------------------
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
  versionType: varchar('version_type', { length: 20 }), // 'original', 'fork', 'update'

  isCurrent: boolean('is_current').default(false),

  status: varchar('status', { length: 20 }), // 'draft', 'published', 'archived'
});

export const artifactTagsTable = pgTable('artifact_tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).unique(),
  description: text('description'),
});

export const artifactCategoriesTable = pgTable('artifact_categories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 50 }).unique(),
  name: varchar('name', { length: 100 }),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
});

export const artifactsToArtifactTagsTable = pgTable('artifacts_to_artifact_tags', {
  artifactId: integer('artifact_id').references(() => artifactsTable.id),
  artifactTagId: integer('artifact_tag_id').references(() => artifactTagsTable.id),
  addedAt: timestamp('added_at').defaultNow(),
}, t => [primaryKey({ columns: [t.artifactId, t.artifactTagId] })]);

// ------------------- Relations -------------------
export const artifactsRelations = relations(artifactsTable, ({ one, many }) => ({
  // one-to-many artifacts.author_id >- users.id
  author: one(usersTable, {
    fields: [artifactsTable.authorId],
    references: [usersTable.id],
  }),
  // one-to-many artifacts.id -< artifacts.root_artifact_id
  rootArtifact: one(artifactsTable, {
    fields: [artifactsTable.rootArtifactId],
    references: [artifactsTable.id],
  }),
  // many-to-one artifacts.id -< artifacts.root_artifact_id
  childrenArtifacts: many(artifactsTable),
  // one-to-many artifacts.id -< artifacts.parent_version_id
  parentVersion: one(artifactsTable, {
    fields: [artifactsTable.parentVersionId],
    references: [artifactsTable.id],
  }),
  // many-to-one artifacts.id -< artifacts.parent_version_id
  childrenVersions: many(artifactsTable),
  // one-to-many artifacts_categories.id -< artifacts.category_id
  category: one(artifactCategoriesTable, {
    fields: [artifactsTable.categoryId],
    references: [artifactCategoriesTable.id],
  }),
  // many-to-many artifacts.id >-< tags.id
  artifactTags: many(artifactsToArtifactTagsTable),
  // many-to-many artifacts.id >-< projects.id
  projects: many(artifactsToProjectsTable),
  // many-to-many artifacts.id >-< teams.id
  // artifactsToTeams: many(artifactToTeamsTable),
}));

// many-to-many artifacts.id >-< tags.id
export const artifactTagsRelations = relations(artifactTagsTable, ({ many }) => ({
  artifacts: many(artifactsToArtifactTagsTable),
}));

// many-to-one artifacts_categories.id -< artifacts.category_id
export const artifactsCategoriesRelations = relations(artifactCategoriesTable, ({ many }) => ({
  artifacts: many(artifactsTable),
}));

export const artifactToTagRelations = relations(artifactsToArtifactTagsTable, ({ one }) => ({
  artifact: one(artifactsTable, {
    fields: [artifactsToArtifactTagsTable.artifactId],
    references: [artifactsTable.id],
  }),
  artifactTag: one(artifactTagsTable, {
    fields: [artifactsToArtifactTagsTable.artifactTagId],
    references: [artifactTagsTable.id],
  }),
}));

// many-to-many artifacts.id >-< projects.id
// ../projects/index.ts
// ../Schema.ts

// many-to-many artifacts.id >-< teams.id
// ../teams/index.ts
// ../Schema.ts
