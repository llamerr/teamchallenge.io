import { relations } from 'drizzle-orm';
import { pgTable, serial } from 'drizzle-orm/pg-core';
import { notificationsTable } from '../notifications';

// ------------------- Tables -------------------
export const newsTable = pgTable('news', {
  id: serial('id').primaryKey(),
});

// ------------------- Relations -------------------
export const newsRelations = relations(newsTable, ({ many }) => ({
  notifications: many(notificationsTable),
}));
