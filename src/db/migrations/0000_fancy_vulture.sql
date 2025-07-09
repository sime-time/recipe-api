CREATE TABLE `favorite` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`recipe_id` integer NOT NULL,
	`title` text NOT NULL,
	`image` text,
	`cook_time` text,
	`servings` text,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
