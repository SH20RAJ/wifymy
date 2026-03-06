import { pgTable, text, timestamp, boolean, uuid, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  username: text('username').unique(), // Used for routing /[username]
  displayName: text('display_name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  themeId: text('theme_id').default('minimalist'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const links = pgTable('links', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  icon: text('icon'), // e.g., 'instagram', 'youtube'
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});
