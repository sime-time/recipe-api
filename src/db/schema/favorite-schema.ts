import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const favorite = sqliteTable("favorite", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull(),
  recipeId: integer("recipe_id").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  cookTime: text("cook_time"),
  servings: text("servings"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
