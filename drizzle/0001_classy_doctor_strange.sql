CREATE TABLE `analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`page_id` text NOT NULL,
	`link_id` text,
	`type` text NOT NULL,
	`user_agent` text,
	`referrer` text,
	`device_type` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`link_id`) REFERENCES `links`(`id`) ON UPDATE no action ON DELETE cascade
);
