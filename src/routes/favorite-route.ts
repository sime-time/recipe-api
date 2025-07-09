import { Hono } from "hono";
import { createFavorite, deleteFavorite, getUserFavorites } from "../controllers/favorite-controller";

const router = new Hono();

router.post("/", createFavorite);

router.delete("/:userId/:recipeId", deleteFavorite);

router.get("/:userId", getUserFavorites);

export default router;
