import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // using UUID string
  email: text('email').unique().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const pages = sqliteTable('pages', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  slug: text('slug').unique().notNull(), // Used for routing /[slug]
  displayName: text('display_name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  themeId: text('theme_id').default('minimalist'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const links = sqliteTable('links', {
  id: text('id').primaryKey(),
  pageId: text('page_id').references(() => pages.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  icon: text('icon'), // e.g., 'instagram', 'youtube'
  order: integer('order').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const analytics = sqliteTable('analytics', {
  id: text('id').primaryKey(),
  pageId: text('page_id').references(() => pages.id, { onDelete: 'cascade' }).notNull(),
  linkId: text('link_id').references(() => links.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // 'view' or 'click'
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  deviceType: text('device_type'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});
