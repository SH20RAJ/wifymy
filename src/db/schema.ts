import { pgTable, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const pages = pgTable('pages', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  slug: text('slug').notNull().unique(),
  displayName: text('display_name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  themeId: text('theme_id').default('minimalist').notNull(),
  customTheme: jsonb('custom_theme'),
  claps: integer('claps').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const links = pgTable('links', {
  id: text('id').primaryKey(),
  pageId: text('page_id').notNull().references(() => pages.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  url: text('url').notNull(),
  icon: text('icon'),
  order: integer('order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const analytics = pgTable('analytics', {
  id: text('id').primaryKey(),
  pageId: text('page_id').notNull().references(() => pages.id, { onDelete: 'cascade' }),
  linkId: text('link_id').references(() => links.id, { onDelete: 'set null' }),
  type: text('type').notNull(), // 'VIEW' | 'CLICK'
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  deviceType: text('device_type'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const deeplinks = pgTable('deeplinks', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  slug: text('slug').notNull().unique(),
  destinationUrl: text('destination_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations for easier querying
export const usersRelations = relations(users, ({ many }) => ({
  pages: many(pages),
  deeplinks: many(deeplinks),
}));

export const pagesRelations = relations(pages, ({ one, many }) => ({
  user: one(users, {
    fields: [pages.userId],
    references: [users.id],
  }),
  links: many(links),
  analytics: many(analytics),
}));

export const linksRelations = relations(links, ({ one, many }) => ({
  page: one(pages, {
    fields: [links.pageId],
    references: [pages.id],
  }),
  analytics: many(analytics),
}));
