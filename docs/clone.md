
3 minutes ago

Review
Product Requirements Document (PRD): Wify Linktree Clone MVP
1. Product Overview
Name: Wify (Linktree Alternative / Smart Profile) Vision: A premium, blazing-fast, privacy-first link-in-bio platform that not only aggregates a user's digital identity but actively enhances engagement by utilizing deep-linking technology to bypass restrictive in-app browsers.

Unique Selling Proposition (USP)
Unlike standard Linktree alternatives, Wify has a built-in deep-linking engine. When a user adds an Instagram, YouTube, or TikTok link to their Wify profile, clicking that link on mobile routes them through Wify's Edge network (/l/) to securely open the native mobile app, preserving user authentication and maximizing conversion rates, likes, and follows.

2. Core Features (MVP)
1. User Authentication
Passwordless/OAuth login (Google, GitHub, Apple) via Auth.js (NextAuth).
Automatic assignment of unique usernames based on OAuth handles or input.
2. Public Profile (/[username])
Dynamic Server-Side Rendered (SSR) profile pages.
Header: Avatar, Display Name, Bio.
Links Container: A vertically scrollable list of smart links with corresponding social icons.
Sub-footer: Optional small social media icon bar for direct profile linking.
3. Deep-Link Integration
Links added to the profile are automatically parsed. If they belong to supported platforms (Instagram, YouTube, TikTok, LinkedIn, etc.), the output URL leverages the /l/ system to invoke native app redirects.
4. Premium Theme Engine
Users can choose from preset aesthetic themes suited for different professions:
Developer: Mono fonts, dark mode, glowing borders.
Creator: Glassmorphism, aesthetic gradients, rounded bouncy cards.
Minimalist: Clean typography (Outfit), monochrome palettes, high contrast.
5. Private Dashboard
Profile Tab: Edit display name, username, bio, and upload avatar.
Links Tab: Add new links, edit titles/URLs, toggle visibility, and drag-and-drop reordering.
Appearance Tab: Select and preview themes instantly.
3. Technical Stack
Framework: Next.js 15 (App Router)
Deployment: Cloudflare Workers (OpenNext) for global, low-latency edge computing.
Styling: Tailwind CSS v4, specialized CSS variables for the theme engine.
Database: PostgreSQL (e.g., Neon or Supabase).
ORM: Drizzle ORM (Selected for raw SQL-like performance, strong TypeScript safety, and excellent serverless/Edge support essential for Cloudflare).
Image Hosting: Cloudflare R2 or direct upload integrations.
4. Drizzle ORM Database Schema (Proposed)
typescript
import { pgTable, text, timestamp, boolean, uuid, integer } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  username: text('username').unique().notNull(), // Used for routing /[username]
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
5. Non-Functional Requirements
Performance: Public profiles must hit a perfect 100 on Lighthouse. Edge fetching required.
Security: Prevent XSS by strictly validating and escaping URL inputs.
Scalability: The database logic via Drizzle must be optimized to run highly concurrent reads since /[username] is a public-facing asset.
6. Future Roadmap (Post-MVP)
Analytics: Basic click tracking (CTR) per link using Cloudflare Analytics engine.
Custom Domains: Allow users to map their own domains.
Monetization: "Pro" blocks like gated content, tipping mechanisms, and removal of Wify branding.