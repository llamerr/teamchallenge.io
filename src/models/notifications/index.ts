import { relations } from 'drizzle-orm';
import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { newsTable, usersTable } from '../Schema';

// ------------------- Tables -------------------
export const notificationsTable = pgTable('notifications', {
  id: serial('id').primaryKey(),
  newsId: integer('news_id').references(() => newsTable.id),
});

// ------------------- Relations -------------------
export const notificationsRelations = relations(notificationsTable, ({ one, many }) => ({
  news: one(newsTable, {
    fields: [notificationsTable.newsId],
    references: [newsTable.id],
  }),
  users: many(usersTable),
}));
