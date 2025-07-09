import { FavoriteSchema } from "../types/db-schema-types";
import { favorite } from "../db/schema/index";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";

export async function createFavorite(c: Context) {
  const body = await c.req.json();
  try {
    const { userId, recipeId, title, image, cookTime, servings } = FavoriteSchema.parse(body);

    if (!userId || !recipeId || !title) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const db = drizzle(c.env.DB);
    const newFavorite = await db.insert(favorite).values({
      userId,
      recipeId,
      title,
      image,
      cookTime,
      servings
    }).returning();

    return c.json({ added: newFavorite[0] }, 201);

  } catch (error) {
    console.error("Error adding favorite", error);
    return c.json({ error: "Something went wrong" }, 500);
  }
}

export async function deleteFavorite(c: Context) {
  const { userId, recipeId } = c.req.param();
  try {
    const db = drizzle(c.env.DB);
    const deletedFavorite = await db
      .delete(favorite)
      .where(
        and(
          eq(favorite.userId, parseInt(userId)),
          eq(favorite.recipeId, parseInt(recipeId)),
        ))
      .returning();

    return c.json({ deleted: deletedFavorite[0] }, 200)

  } catch (error) {
    console.error("Error removing favorite", error);
    return c.json({ error: "Something went wrong" }, 500);
  }
}

export async function getUserFavorites(c: Context) {
  const userId = c.req.param("userId");
  try {
    const db = drizzle(c.env.DB);
    const userFavorites = await db
      .select()
      .from(favorite)
      .where(eq(favorite.userId, parseInt(userId)))

    return c.json(userFavorites, 200);

  } catch (error) {
    console.error("Error getting favorites", error);
    return c.json({ error: "Something went wrong" }, 500);
  }
}
