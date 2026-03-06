CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`icon` text,
	`order` integer DEFAULT 0,
	`is_active` integer DEFAULT true,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`slug` text NOT NULL,
	`display_name` text,
	`bio` text,
	`avatar_url` text,
	`theme_id` text DEFAULT 'minimalist',
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pages_slug_unique` ON `pages` (`slug`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);