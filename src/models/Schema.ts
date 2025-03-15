import { relations } from 'drizzle-orm';
import { boolean, date, integer, pgTable, primaryKey, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { artifactsTable } from './artifacts';
import { languagesTable } from './languages';
import { notificationsTable } from './notifications';
import { projectsTable } from './projects';
import { rolesTable } from './roles';
import { teamsTable } from './teams';
import { technologiesTable } from './technologies';
import { usersTable } from './users';

export * from './artifacts';
export * from './languages';
export * from './news';
export * from './notifications';
export * from './projects';
export * from './roles';
export * from './teams';
export * from './technologies';
export * from './users';

// ------------------- Counter -------------------
export const counterSchema = pgTable('counter', {
  id: serial('id').primaryKey(),
  count: integer('count').default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ------------------- Notifications to Users -------------------
export const notificationsToUsersTable = pgTable('notifications_to_users', {
  notificationId: integer('notification_id').references(() => notificationsTable.id),
  userId: integer('user_id').references(() => usersTable.id),
}, t => [primaryKey({ columns: [t.notificationId, t.userId] })]);
export const notificationsToUsersRelations = relations(notificationsToUsersTable, ({ one }) => ({
  notification: one(notificationsTable, {
    fields: [notificationsToUsersTable.notificationId],
    references: [notificationsTable.id],
  }),
  user: one(usersTable, {
    fields: [notificationsToUsersTable.userId],
    references: [usersTable.id],
  }),
}));

// ------------------- Artifacts to Teams -------------------
export const artifactsToTeamsTable = pgTable('artifacts_to_teams', {
  artifactId: integer('artifact_id').references(() => artifactsTable.id),
  teamId: integer('team_id').references(() => teamsTable.id),
  addedAt: timestamp('added_at').defaultNow(),
}, t => [primaryKey({ columns: [t.artifactId, t.teamId] })]);
export const artifactsToTeamsRelations = relations(artifactsToTeamsTable, ({ one }) => ({
  artifact: one(artifactsTable, {
    fields: [artifactsToTeamsTable.artifactId],
    references: [artifactsTable.id],
  }),
  team: one(teamsTable, {
    fields: [artifactsToTeamsTable.teamId],
    references: [teamsTable.id],
  }),
}));

// ------------------- Artifact to Project -------------------
export const artifactsToProjectsTable = pgTable('artifacts_to_projects', {
  artifactId: integer('artifact_id').references(() => artifactsTable.id),
  projectId: integer('project_id').references(() => projectsTable.id),
  addedAt: timestamp('added_at').defaultNow(),
}, t => [primaryKey({ columns: [t.artifactId, t.projectId] })]);
export const artifactToProjectRelations = relations(artifactsToProjectsTable, ({ one }) => ({
  artifact: one(artifactsTable, {
    fields: [artifactsToProjectsTable.artifactId],
    references: [artifactsTable.id],
  }),
  project: one(projectsTable, {
    fields: [artifactsToProjectsTable.projectId],
    references: [projectsTable.id],
  }),
}));

// ------------------- Projects to Roles -------------------
export const projectsToRolesTable = pgTable('projects_to_roles', {
  projectId: integer('project_id').references(() => projectsTable.id),
  roleId: integer('role_id').references(() => rolesTable.id),
  count: integer('count'),
  specificSkills: text('specific_skills').array(),
}, t => [primaryKey({ columns: [t.projectId, t.roleId] })]);
export const projectsToRolesRelations = relations(projectsToRolesTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [projectsToRolesTable.projectId],
    references: [projectsTable.id],
  }),
  role: one(rolesTable, {
    fields: [projectsToRolesTable.roleId],
    references: [rolesTable.id],
  }),
}));

// ------------------- Projects to Technologies -------------------
export const projectsToTechnologiesTable = pgTable('projects_to_technologies', {
  projectId: integer('project_id').references(() => projectsTable.id),
  technologyId: integer('technology_id').references(() => technologiesTable.id),
  primary: boolean('primary').default(false),
}, t => [primaryKey({ columns: [t.projectId, t.technologyId] })]);
export const projectsToTechnologiesRelations = relations(projectsToTechnologiesTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [projectsToTechnologiesTable.projectId],
    references: [projectsTable.id],
  }),
  technology: one(technologiesTable, {
    fields: [projectsToTechnologiesTable.technologyId],
    references: [technologiesTable.id],
  }),
}));

// ------------------- Users to Languages -------------------
export const usersToLanguagesTable = pgTable('users_to_languages', {
  userId: integer('user_id').references(() => usersTable.id),
  languageId: integer('language_id').references(() => languagesTable.id),
  proficiencyLevel: varchar('proficiency_level', { length: 50 }), // 'Basic', 'Intermediate', 'Fluent'
}, t => ({ primaryKey: [t.languageId, t.userId] }));
export const usersToLanguagesRelations = relations(usersToLanguagesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [usersToLanguagesTable.userId],
    references: [usersTable.id],
  }),
  language: one(languagesTable, {
    fields: [usersToLanguagesTable.languageId],
    references: [languagesTable.id],
  }),
}));

// ------------------- Users to Roles -------------------
export const usersToRolesTable = pgTable('users_to_roles', {
  userId: integer('user_id').references(() => usersTable.id),
  roleId: integer('role_id').references(() => rolesTable.id),
}, t => [primaryKey({ columns: [t.userId, t.roleId] })]);
export const usersToRolesRelations = relations(usersToRolesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [usersToRolesTable.userId],
    references: [usersTable.id],
  }),
  role: one(rolesTable, {
    fields: [usersToRolesTable.roleId],
    references: [rolesTable.id],
  }),
}));

// ------------------- Users to Technologies -------------------
export const usersToTechnologiesTable = pgTable('users_to_technologies', {
  userId: integer('user_id').references(() => usersTable.id),
  technologyId: integer('technology_id').references(() => technologiesTable.id),
}, t => [primaryKey({ columns: [t.userId, t.technologyId] })]);
export const usersToTechnologiesRelations = relations(usersToTechnologiesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [usersToTechnologiesTable.userId],
    references: [usersTable.id],
  }),
  technology: one(technologiesTable, {
    fields: [usersToTechnologiesTable.technologyId],
    references: [technologiesTable.id],
  }),
}));

// ------------------- Teams to Languages -------------------
export const teamsToLanguagesTable = pgTable('teams_to_languages', {
  teamId: integer('team_id').references(() => teamsTable.id),
  languageId: integer('language_id').references(() => languagesTable.id),
}, t => ({ primaryKey: [t.teamId, t.languageId] }));
export const teamsToLanguagesRelations = relations(teamsToLanguagesTable, ({ one }) => ({
  team: one(teamsTable, {
    fields: [teamsToLanguagesTable.teamId],
    references: [teamsTable.id],
  }),
  language: one(languagesTable, {
    fields: [teamsToLanguagesTable.languageId],
    references: [languagesTable.id],
  }),
}));

// ------------------- Users to Teams -------------------
export const usersToTeamsTable = pgTable('users_to_teams', {
  userId: integer('user_id').references(() => usersTable.id),
  teamId: integer('team_id').references(() => teamsTable.id),
  role: varchar('role', { length: 50 }),
  joinDate: date('join_date'),
  status: varchar('status', { length: 50 }),
}, t => ({ primaryKey: [t.userId, t.teamId, t.role] }));
export const usersToTeamsRelations = relations(usersToTeamsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [usersToTeamsTable.userId],
    references: [usersTable.id],
  }),
  team: one(teamsTable, {
    fields: [usersToTeamsTable.teamId],
    references: [teamsTable.id],
  }),
  role: one(rolesTable, {
    fields: [usersToTeamsTable.role],
    references: [rolesTable.id],
  }),
}));
