import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { artifactsToProjectsTable, projectsToRolesTable, projectsToTechnologiesTable, teamsTable } from '../Schema';

// ------------------- Tables -------------------
export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  longDescription: text('long_description'),
  categoryId: integer('category_id').references(() => projectCategoriesTable.id),
  complexity: varchar('complexity', { length: 20 }), // 'low', 'medium', 'high'
  longevity: varchar('longevity', { length: 20 }), // 'short-term', 'medium-term', 'long-term'
  duration: varchar('duration', { length: 50 }),
  teamSize: integer('team_size'),
  progress: integer('progress'),
  stars: integer('stars').default(0),
  forks: integer('forks').default(0),
  lastUpdated: timestamp('last_updated'),
  createdAt: timestamp('created_at').defaultNow(),
  repositoryUrl: varchar('repository_url', { length: 500 }),
  demoUrl: varchar('demo_url', { length: 500 }),
});

export const projectCategoriesTable = pgTable('project_categories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 50 }).unique(),
  name: varchar('name', { length: 100 }),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
});

export const projectLearningOutcomesTable = pgTable('project_learning_outcomes', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projectsTable.id),
  outcome: text('outcome'),
});

// ------------------- Relations -------------------
export const projectsRelations = relations(projectsTable, ({ many, one }) => ({
  // one-to-many projects.category_id >- project_categories.id
  category: one(projectCategoriesTable, {
    fields: [projectsTable.categoryId],
    references: [projectCategoriesTable.id],
  }),
  // many-to-one projects.id -< teams.project_id
  teams: many(teamsTable),
  // many-to-one projects.id -< project_learning_outcomes.project_id
  projectLearningOutcomes: many(projectLearningOutcomesTable),
  // many-to-many projects.id >-< technologies.id
  technologies: many(projectsToTechnologiesTable),
  // many-to-many projects.id >-< artifacts.id
  artifacts: many(artifactsToProjectsTable),
  // many-to-many projects.id >-< roles.id
  roles: many(projectsToRolesTable),
}));

export const projectCategoriesRelations = relations(projectCategoriesTable, ({ many }) => ({
  // many-to-one projects.category_id >- project_categories.id
  projects: many(projectsTable),
}));

export const projectLearningOutcomesRelations = relations(projectLearningOutcomesTable, ({ one }) => ({
  // one-to-many projects.id -< project_learning_outcomes.project_id
  project: one(projectsTable, {
    fields: [projectLearningOutcomesTable.projectId],
    references: [projectsTable.id],
  }),
}));

// one-to-many projects.id -< teams.project_id

// many-to-many projects.id >-< artifacts.id
// ../artifacts/index.ts
// ../Schema.ts

// many-to-many projects.id >-< roles.id
// ../roles/index.ts
// ../Schema.ts

// many-to-many projects.id >-< technologies.id
// ../technologies/index.ts
// ../Schema.ts
